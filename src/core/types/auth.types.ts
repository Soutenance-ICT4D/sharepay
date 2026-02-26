/*
    Wrapper standard de toutes les réponses du backend Sharepay.

    Le backend utilise @JsonInclude(NON_NULL) sur le champ `data` :
        - Succès  → data est présent et typé en T
        - Erreur  → data est omis (désérialisé en `null` côté JS)

    Toujours consommer via `parseApiResponse()` de `@/core/lib/api-response`.
 */
export interface ApiResponse<T = null> {
    success: boolean;
    code: string;
    message: string;
    data: T | null;
    timestamp: string;
}

// 1. Inscription
export interface RegisterRequest {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    role?: "MERCHANT" | "ADMIN";
    countryCode: string;
}

// Réponse suite à une inscription/vérification (User object)
export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    verified: boolean;
    createdAt: string;
}

// 2. Vérification OTP
export interface VerifyEmailRequest {
    email: string;
    otpCode: string;
}

// 3. Login
export interface LoginRequest {
    email: string;
    password?: string;
}

export interface AuthTokenData {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
}

// 5. Mot de passe oublié
export interface ForgotPasswordRequest {
    email: string;
}

// 6. Vérifier OTP Reset
export interface VerifyResetCodeRequest {
    email: string;
    otpCode: string;
}

export interface VerifyResetCodeResponse {
    resetToken: string;
}

// 7. Reset Password Final
export interface ResetPasswordRequest {
    email: string;
    resetToken: string;
    newPassword: string;
}
