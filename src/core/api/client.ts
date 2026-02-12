import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/core/lib/token-storage";

// URL de base de l'API (à configurer dans .env.local)
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export const client = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepteur de requête : Ajoute le token automatiquement et log la requête
client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        const tokens = tokenStorage.get();
        if (tokens?.accessToken) {
            config.headers.Authorization = `${tokens.tokenType} ${tokens.accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Intercepteur de réponse : Gère les erreurs globales (ex: 401)
client.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        const isLoginRequest = originalRequest.url?.includes("/auth/login");
        const isRefreshRequest = originalRequest.url?.includes("/auth/refresh-token");

        // Si 401 et ce n'est ni un login ni un refresh
        if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest && !isRefreshRequest) {
            originalRequest._retry = true;

            try {
                const tokens = tokenStorage.get();
                if (!tokens?.refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Call refresh endpoint directly using axios to avoid interceptor loop
                // We assume the refresh endpoint is at /auth/refresh-token
                const response = await axios.post(
                    `${baseURL}/auth/refresh-token`,
                    { refreshToken: tokens.refreshToken },
                    { headers: { "Content-Type": "application/json" } }
                );

                const newData = response.data;

                if (newData.success && newData.data) {
                    const newTokens = newData.data;
                    // Save new tokens
                    tokenStorage.set({
                        accessToken: newTokens.accessToken,
                        refreshToken: newTokens.refreshToken,
                        tokenType: newTokens.tokenType
                    });

                    // Update header and retry original request
                    originalRequest.headers.Authorization = `${newTokens.tokenType} ${newTokens.accessToken}`;
                    return client(originalRequest);
                } else {
                    throw new Error("Refresh failed");
                }
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                // Logout cleanly
                tokenStorage.clear();
                if (typeof window !== "undefined") {
                    // Prevent infinite redirect loops
                    if (!window.location.pathname.includes("/login")) {
                        window.location.href = "/login";
                    }
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
