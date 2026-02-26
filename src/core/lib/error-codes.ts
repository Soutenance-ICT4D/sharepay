import { ApiError } from "@/core/lib/api-error";

/*
    Vérifie si une erreur inconnue est une ApiError typée (guard TypeScript).
    Usage : 
        catch (e) { 
            if (isApiError(e)) { console.log(e.code) }
        }
 */
export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

/*
    Map complète des codes d'erreur backend → clé de traduction i18n.
    Couvre tous les codes émis par GlobalExceptionHandler et les BusinessException.
 */
const ERROR_CODE_MAP: Record<string, string> = {
    // Auth
    AUTH_INVALID_CREDENTIALS: "invalid_credentials",
    AUTH_USER_NOT_FOUND: "user_not_found",
    AUTH_EMAIL_ALREADY_EXISTS: "email_exists",
    AUTH_NOT_VERIFIED: "not_verified",
    AUTH_INVALID_OTP: "invalid_otp",
    AUTH_OTP_EXPIRED: "otp_expired",
    AUTH_ACCOUNT_LOCKED: "account_locked",
    AUTH_TOKEN_EXPIRED: "session_expired",
    AUTH_FAILED: "auth_failed",
    AUTH_ACCOUNT_DISABLED: "account_disabled",
    AUTH_ALREADY_VERIFIED: "already_verified",
    AUTH_INVALID_TOKEN: "invalid_token",
    AUTH_TOKEN_REVOKED: "token_revoked",

    // Apps
    APP_NOT_FOUND: "app_not_found",
    APP_ACCESS_DENIED: "access_denied",
    APP_NAME_DUPLICATE: "app_name_duplicate",
    APP_INVALID_ENVIRONMENT: "invalid_environment",
    APP_KEY_NOT_FOUND: "api_key_not_found",

    // Payment Links
    PAYMENT_LINK_NOT_FOUND: "payment_link_not_found",
    PAYMENT_LINK_EXPIRED: "payment_link_expired",
    PAYMENT_LINK_INACTIVE: "payment_link_inactive",

    // Transactions
    TRANSACTION_NOT_FOUND: "transaction_not_found",

    // Erreurs HTTP génériques (GlobalExceptionHandler)
    UNAUTHORIZED: "unauthorized",
    ROUTE_NOT_FOUND: "route_not_found",
    VALIDATION_ERROR: "validation_error",
    MALFORMED_JSON: "malformed_json",

    // Erreurs réseau / système
    NETWORK_ERROR: "network_error",
    INTERNAL_SERVER_ERROR: "internal_server_error",
    UNKNOWN_ERROR: "unknown_error",
};

/*
    Traduit un code backend en clé i18n lisible.
    Retourne "unknown_error" si le code est inconnu.
 */
export function getErrorMessageKey(code: string): string {
    return ERROR_CODE_MAP[code] ?? "unknown_error";
}

/*
    @deprecated Utiliser `getErrorMessageKey` à la place.
    Conservé pour compatibilité avec le code existant.
 */
export const getAuthErrorMessage = getErrorMessageKey;
