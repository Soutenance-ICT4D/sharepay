import { ApiResponse } from "@/lib/api/types";
import { ApiError } from "@/lib/api/error";

export function parseApiResponse<T>(apiResponse: ApiResponse<T>, httpStatus?: number): T {
    if (!apiResponse.success) {
        throw new ApiError(
            apiResponse.code ?? "UNKNOWN_ERROR",
            apiResponse.message ?? "Une erreur inattendue est survenue.",
            httpStatus
        );
    }
    return apiResponse.data as T;
}
