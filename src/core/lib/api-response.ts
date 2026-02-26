import { ApiResponse } from "@/core/types/auth.types";
import { ApiError } from "@/core/lib/api-error";

/*
    Helper centralisé pour consommer les réponses du backend.
    Le backend retourne TOUJOURS le format :
    { 
        success,
        code,
        message,
        data?,
        timestamp
    }

    - Si `success: false`  → throw ApiError(code, message, httpStatus?)
    - Si `success: true`   → retourne data (avec cast TypeScript sûr)

    @param apiResponse  L'objet `response.data` reçu depuis Axios
    @param httpStatus   Le statut HTTP de la réponse Axios (optionnel, pour enrichir ApiError)
    @returns            Le champ `data` typé en T (peut être null pour les réponses void)
    @throws             ApiError si success === false
 */
export function parseApiResponse<T>(
    apiResponse: ApiResponse<T>,
    httpStatus?: number
): T {
    if (!apiResponse.success) {
        throw new ApiError(
            apiResponse.code ?? "UNKNOWN_ERROR",
            apiResponse.message ?? "Une erreur inattendue est survenue.",
            httpStatus
        );
    }

    // data peut être null pour les endpoints void (ex: logout, register).
    // On retourne null casté comme T pour laisser le service décider.
    return apiResponse.data as T;
}
