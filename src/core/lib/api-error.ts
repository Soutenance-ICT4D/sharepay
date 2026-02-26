/*
    ApiError — Erreur typée issue du backend Sharepay.

    Représente une réponse d'erreur de l'API ayant le format :
    {
        success: false,
        code: "APP_NOT_FOUND",
        message: "...",
        timestamp: "..."
    }

    Avantages par rapport à `new Error(string)` :
    - `code` est machine-readable (pour les maps de messages i18n)
    - `httpStatus` permet au code UI de distinguer 401 / 403 / 404 / 500
    - Compatible avec `instanceof ApiError` pour les guards TypeScript
 */
export class ApiError extends Error {
    /** Code machine du backend, ex: "APP_NOT_FOUND", "AUTH_INVALID_CREDENTIALS" */
    readonly code: string;
    /** Statut HTTP d'origine (si disponible depuis l'intercepteur Axios) */
    readonly httpStatus?: number;

    constructor(code: string, message: string, httpStatus?: number) {
        super(message);
        this.name = "ApiError";
        this.code = code;
        this.httpStatus = httpStatus;

        // Fix pour l'héritage d'Error en TypeScript compilé vers ES5
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
