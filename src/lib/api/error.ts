export function isApiError(e: unknown): e is ApiError {
    return e instanceof ApiError;
}

export class ApiError extends Error {
    readonly code: string;
    readonly httpStatus?: number;
    readonly retryAfter?: number; // secondes, présent uniquement sur les réponses 429

    constructor(code: string, message: string, httpStatus?: number, retryAfter?: number) {
        super(message);
        this.name = "ApiError";
        this.code = code;
        this.httpStatus = httpStatus;
        this.retryAfter = retryAfter;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
