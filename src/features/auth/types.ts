// 1. Inscription
export interface RegisterRequest {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    country: string;
}

// 2. Profil utilisateur (AuthInfoResponse backend)
export interface AuthUserInfo {
    accountId: string;
    email: string;
    fullName: string;
    role: string;
    status: string;
    kycLevel: string;
}

// 3. Vérification OTP email
export interface VerifyEmailRequest {
    email: string;
    otp: string;
}

// 4. Login
export interface LoginRequest {
    email: string;
    password: string;
}

// Réponse login/refresh (AuthLoginResponse backend)
export interface AuthTokenData {
    accessToken: string;
    refreshToken: string;
    user: AuthUserInfo;
}

// 5. Mot de passe oublié
export interface ForgotPasswordRequest {
    email: string;
}

// 6. Vérification OTP reset
export interface VerifyResetCodeRequest {
    email: string;
    otp: string;
}

export interface VerifyResetCodeResponse {
    resetToken: string;
}

// 7. Nouveau mot de passe
export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
}
