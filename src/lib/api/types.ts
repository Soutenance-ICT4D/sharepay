/**
 * Wrapper standard de toutes les réponses du backend Sharepay.
 * Toujours consommer via `parseApiResponse()` de `@/lib/api/response`.
 */
export interface ApiResponse<T = null> {
    success: boolean;
    code: string;
    message: string;
    data: T | null;
    timestamp: string;
}
