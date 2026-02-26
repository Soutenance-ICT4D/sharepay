import { client } from "@/core/api/client";
import { parseApiResponse } from "@/core/lib/api-response";
import { ApiResponse, AuthTokenData, VerifyResetCodeResponse } from "@/core/types/auth.types";
import {
    LoginRequest,
    RegisterRequest,
    VerifyEmailRequest,
    ForgotPasswordRequest,
    VerifyResetCodeRequest,
    ResetPasswordRequest,
} from "@/core/types/auth.types";
import { tokenStorage } from "@/core/lib/token-storage";

/*
    Service d'authentification — toutes les erreurs sont des `ApiError`.
    Consommer avec `isApiError(e)` dans les composants pour gérer finement les cas.
 */
export const authService = {
    /*
        POST /auth/login
        Authentifie l'utilisateur et sauvegarde les tokens.
        @param rememberMe  true → localStorage (30 jours), false → sessionStorage
     */
    async login(data: LoginRequest, rememberMe: boolean = false): Promise<AuthTokenData> {
        const response = await client.post<ApiResponse<AuthTokenData>>("/auth/login", data);
        const authData = parseApiResponse(response.data, response.status);

        tokenStorage.set(
            {
                accessToken: authData!.accessToken,
                refreshToken: authData!.refreshToken,
                tokenType: authData!.tokenType,
            },
            { persist: rememberMe }
        );

        return authData!;
    },

    /*
        POST /auth/register
        Inscription marchand 
    */
    async register(data: RegisterRequest): Promise<void> {
        const response = await client.post<ApiResponse<null>>("/auth/register", data);
        parseApiResponse(response.data, response.status);
    },

    /**
        POST /auth/verify-otp
        Vérification de l'OTP email
    */
    async verifyEmail(data: VerifyEmailRequest): Promise<void> {
        const response = await client.post<ApiResponse<null>>("/auth/verify-otp", data);
        parseApiResponse(response.data, response.status);
    },

    /*
        POST /auth/resend-otp
        Renvoi d'un OTP
    */
    async resendOtp(email: string): Promise<void> {
        const response = await client.post<ApiResponse<null>>("/auth/resend-otp", { email });
        parseApiResponse(response.data, response.status);
    },

    /*
        POST /auth/forgot-password
        Demande de réinitialisation de MDP
    */
    async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
        const response = await client.post<ApiResponse<null>>("/auth/forgot-password", data);
        parseApiResponse(response.data, response.status);
    },

    /**
        POST /auth/verify-reset-otp
        Vérification OTP de reset.
        Retourne un `resetToken` temporaire à utiliser dans `resetPassword`.
     */
    async verifyResetCode(data: VerifyResetCodeRequest): Promise<VerifyResetCodeResponse> {
        const response = await client.post<ApiResponse<VerifyResetCodeResponse>>(
            "/auth/verify-reset-otp",
            data
        );
        return parseApiResponse(response.data, response.status)!;
    },

    /*
        POST /auth/reset-password
        Définit le nouveau mot de passe
    */
    async resetPassword(data: ResetPasswordRequest): Promise<void> {
        const response = await client.post<ApiResponse<null>>("/auth/reset-password", data);
        parseApiResponse(response.data, response.status);
    },

    /*
        POST /auth/refresh-token — Rafraîchissement manuel du token.
        Note : le refresh automatique est géré par l'intercepteur dans `client.ts`.
        Cette méthode n'est utile que si on veut forcer un refresh explicitement.
    */
    async refreshToken(refreshToken: string): Promise<AuthTokenData> {
        const response = await client.post<ApiResponse<AuthTokenData>>("/auth/refresh-token", {
            refreshToken,
        });
        const authData = parseApiResponse(response.data, response.status)!;

        tokenStorage.set({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            tokenType: authData.tokenType,
        });

        return authData;
    },

    /*
        POST /auth/logout — Révoque le refresh token côté backend.
        L'access token reste valide jusqu'à son expiration naturelle (15 min max).
        On efface le stockage local dans tous les cas (succès ou erreur réseau).
    */
    async logout(): Promise<void> {
        try {
            const tokens = tokenStorage.get();
            if (tokens?.refreshToken) {
                await client.post<ApiResponse<null>>("/auth/logout", {
                    refreshToken: tokens.refreshToken,
                });
            }
        } finally {
            // Nettoyage local garanti même si le backend est indisponible
            tokenStorage.clear();
        }
    },

    // Non implémenté — intégration OAuth Google à venir
    async loginWithGoogle(): Promise<void> {
        throw new Error("Google login not yet implemented with backend");
    },
};
