import { client } from "@/core/api/client";
import { tokenStorage } from "@/core/lib/token-storage";
import {
    LoginRequest,
    RegisterRequest,
    VerifyEmailRequest,
    ForgotPasswordRequest,
    VerifyResetCodeRequest,
    ResetPasswordRequest,
    ApiResponse,
    AuthTokenData,
    VerifyResetCodeResponse
} from "@/core/types/auth.types";

export const authService = {
    async login(data: LoginRequest, rememberMe: boolean = false): Promise<AuthTokenData> {
        try {
            // L'API renvoie ApiResponse<AuthTokenData>
            const response = await client.post<ApiResponse<AuthTokenData>>("/auth/login", data);

            if (!response.data.success) {
                // Cas où l'API répond 200 OK mais success: false (rare en REST standard mais possible)
                throw new Error(response.data.code || "UNKNOWN_ERROR");
            }

            const authData = response.data.data;

            // Save tokens
            tokenStorage.set({
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                tokenType: authData.tokenType
            }, { persist: rememberMe });

            return authData;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async register(data: RegisterRequest): Promise<void> {
        try {
            await client.post<ApiResponse>("/auth/register", data);
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async verifyEmail(data: VerifyEmailRequest): Promise<void> {
        try {
            // Doc: POST /auth/verify-otp
            await client.post<ApiResponse>("/auth/verify-otp", data);
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
        try {
            await client.post<ApiResponse>("/auth/forgot-password", data);
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async verifyResetCode(data: VerifyResetCodeRequest): Promise<VerifyResetCodeResponse> {
        try {
            // Doc: POST /auth/verify-reset-otp -> returns { resetToken: "..." }
            const response = await client.post<ApiResponse<VerifyResetCodeResponse>>("/auth/verify-reset-otp", data);

            if (!response.data.success) {
                throw new Error(response.data.code || "UNKNOWN_ERROR");
            }

            return response.data.data;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async resetPassword(data: ResetPasswordRequest): Promise<void> {
        try {
            await client.post<ApiResponse>("/auth/reset-password", data);
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async resendOtp(email: string): Promise<void> {
        try {
            await client.post<ApiResponse>("/auth/resend-otp", { email });
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async refreshToken(refreshToken: string): Promise<AuthTokenData> {
        try {
            const response = await client.post<ApiResponse<AuthTokenData>>("/auth/refresh-token", { refreshToken });
            if (!response.data.success) {
                throw new Error(response.data.code || "UNKNOWN_ERROR");
            }
            const authData = response.data.data;
            // Update storage
            tokenStorage.set({
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                tokenType: authData.tokenType
            });
            return authData;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError = error.response.data as ApiResponse;
                throw new Error(apiError.code || apiError.message || "UNKNOWN_ERROR");
            }
            throw error;
        }
    },

    async loginWithGoogle(): Promise<void> {
        throw new Error("Google login not yet implemented with backend");
    },

    async logout(): Promise<void> {
        try {
            const tokens = tokenStorage.get();
            if (tokens?.refreshToken) {
                await client.post("/auth/logout", { refreshToken: tokens.refreshToken });
            }
        } catch {
            // Ignore backend errors during logout (e.g. 500 or 401)
            // We want to clear local session regardless
        } finally {
            tokenStorage.clear();
        }
    }
};
