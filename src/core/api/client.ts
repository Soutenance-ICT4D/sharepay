import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/core/lib/token-storage";
import { ApiError } from "@/core/lib/api-error";
import { ApiResponse } from "@/core/types/auth.types";

// Configuration

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export const client = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});

// Refresh Token Queue (mécanisme anti-race condition)

/* 
    Problème : Si 3 requêtes reçoivent un 401 simultanément, sans système de 
    verrou, 3 appels à /auth/refresh-token seraient lancés → le backend révoque 
    le 1er refresh token après le 1er appel → les 2 suivants échouent.
*/

/*
    Solution : un verrou `isRefreshing` et une file d'attente `refreshQueue`.
    Seule la 1ère requête lance le refresh ; les autres sont suspendues et 
    reprennent (ou échouent) dès que le refresh est terminé.
*/

type QueueCallback = (error: ApiError | null, accessToken: string | null) => void;

let isRefreshing = false;
let refreshQueue: QueueCallback[] = [];

// Résout toutes les requêtes en attente avec le nouveau token ou une erreur.
function drainQueue(error: ApiError | null, accessToken: string | null): void {
    refreshQueue.forEach((callback) => callback(error, accessToken));
    refreshQueue = [];
}

// Intercepteur de requête : injection du token Bearer

client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const tokens = tokenStorage.get();
        if (tokens?.accessToken) {
            config.headers.Authorization = `${tokens.tokenType} ${tokens.accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Intercepteur de réponse : refresh token safe + ApiError unifié

client.interceptors.response.use(
    // Succès
    (response: AxiosResponse) => response,

    // Erreur
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Pas de réponse HTTP (coupure réseau, timeout…)
        if (!error.response) {
            return Promise.reject(
                new ApiError("NETWORK_ERROR", "Erreur réseau. Vérifiez votre connexion internet.")
            );
        }

        const status = error.response.status;
        const responseData = error.response.data as ApiResponse | undefined;

        // Erreurs non-401 : on convertit en ApiError et on propage
        if (status !== 401) {
            const code = responseData?.code ?? "UNKNOWN_ERROR";
            const message = responseData?.message ?? "Une erreur inattendue est survenue.";
            return Promise.reject(new ApiError(code, message, status));
        }

        // 401 sur les routes d'auth elles-mêmes → pas de retry
        const url = originalRequest.url ?? "";
        const isAuthRoute = url.includes("/auth/login") || url.includes("/auth/refresh-token");

        if (isAuthRoute || originalRequest._retry) {
            const code = responseData?.code ?? "UNAUTHORIZED";
            const message = responseData?.message ?? "Session expirée. Veuillez vous reconnecter.";
            return Promise.reject(new ApiError(code, message, 401));
        }

        // 401 sur une requête normale → logique de refresh
        originalRequest._retry = true;

        if (isRefreshing) {
            // Un refresh est déjà en cours : on suspend cette requête dans la queue.
            return new Promise<AxiosResponse>((resolve, reject) => {
                refreshQueue.push((queueError, newAccessToken) => {
                    if (queueError || !newAccessToken) {
                        reject(queueError ?? new ApiError("UNAUTHORIZED", "Session expirée."));
                        return;
                    }
                    // Réessaie la requête originale avec le nouveau token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    resolve(client(originalRequest));
                });
            });
        }

        // On devient le "leader" du refresh
        isRefreshing = true;

        try {
            const tokens = tokenStorage.get();

            if (!tokens?.refreshToken) {
                throw new ApiError("UNAUTHORIZED", "Aucun refresh token disponible.");
            }

            // Appel direct avec axios natif (pas le client) pour éviter de
            // repasser dans cet intercepteur et créer une boucle infinie.
            const refreshResponse = await axios.post<ApiResponse<{
                accessToken: string;
                refreshToken: string;
                tokenType: string;
                expiresIn: number;
            }>>(
                `${baseURL}/auth/refresh-token`,
                { refreshToken: tokens.refreshToken },
                { headers: { "Content-Type": "application/json" } }
            );

            const body = refreshResponse.data;

            if (!body.success || !body.data) {
                throw new ApiError(
                    body.code ?? "AUTH_TOKEN_EXPIRED",
                    body.message ?? "Le refresh token est invalide ou révoqué."
                );
            }

            const newTokens = body.data;

            // Sauvegarde les nouveaux tokens (rotation : l'ancien refresh est révoqué côté backend)
            tokenStorage.set({
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
                tokenType: newTokens.tokenType,
            });

            // Débloque toutes les requêtes en attente avec le nouveau token
            drainQueue(null, newTokens.accessToken);

            // Réessaie la requête originale
            originalRequest.headers.Authorization = `${newTokens.tokenType} ${newTokens.accessToken}`;
            return client(originalRequest);
        } catch (refreshError) {
            // Le refresh a échoué (token révoqué, expiré, réseau…)
            const apiError =
                refreshError instanceof ApiError
                    ? refreshError
                    : new ApiError("UNAUTHORIZED", "Session expirée. Veuillez vous reconnecter.");

            // Rejette toutes les requêtes en attente
            drainQueue(apiError, null);

            // Nettoyage de la session locale
            tokenStorage.clear();

            // Redirection vers login (uniquement côté navigateur)
            if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
                window.location.href = "/login";
            }

            return Promise.reject(apiError);
        } finally {
            // On relâche le verrou dans tous les cas
            isRefreshing = false;
        }
    }
);
