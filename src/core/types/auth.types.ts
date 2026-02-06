// Wrapper standard API Response
export interface ApiResponse<T = void> {
    success: boolean;
    code: string; // ex: "SUCCESS", "AUTH_INVALID_CREDENTIALS"
    message: string;
    data: T;
    timestamp: string;
}

// 1. Inscription
export interface RegisterRequest {
    fullName: string;
    email: string;
    phone: string;
    password?: string; // Optionnel si OAUTH, mais requis par API standard
    role?: "USER" | "MERCHANT" | "ADMIN"; // Default MERCHANT
    countryCode?: string; // Utile pour le front, peut-être à concaténer dans 'phone' avant envoi
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
    tokenType: string; // "Bearer"
    expiresIn: number;
}

// 5. Mot de passe oublié
export interface ForgotPasswordRequest {
    email: string;
}

// 6. Vérifier OTP Reset
export interface VerifyResetCodeRequest {
    email: string; // Requis selon context, souvent utile pour identifier le user
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
