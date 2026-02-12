export const getAuthErrorMessage = (code: string): string => {
    const errorMap: Record<string, string> = {
        // Auth-specific errors
        "AUTH_INVALID_CREDENTIALS": "invalid_credentials",
        "AUTH_USER_NOT_FOUND": "user_not_found",
        "AUTH_EMAIL_ALREADY_EXISTS": "email_exists",
        "AUTH_NOT_VERIFIED": "not_verified",
        "AUTH_INVALID_OTP": "invalid_otp",
        "AUTH_OTP_EXPIRED": "otp_expired",
        "AUTH_ACCOUNT_LOCKED": "account_locked",
        "AUTH_TOKEN_EXPIRED": "session_expired",
        "AUTH_FAILED": "auth_failed",
        "AUTH_ACCOUNT_DISABLED": "account_disabled",
        "AUTH_ALREADY_VERIFIED": "already_verified",
        "AUTH_INVALID_TOKEN": "invalid_token",
        "AUTH_TOKEN_REVOKED": "token_revoked",

        // Validations
        "VALIDATION_ERROR": "validation_error",

        // Generic
        "INTERNAL_SERVER_ERROR": "internal_server_error",
        "UNKNOWN_ERROR": "unknown_error"
    };

    return errorMap[code] || "unknown_error";
};
