import { client } from "@/core/api/client";
import { ApiResponse } from "@/core/types/auth.types";
import {
    AppResponse,
    ApiKeyResponse,
    CreateAppRequest,
    UpdateAppRequest,
} from "@/core/types/apps.types";

/** Extracts a typed error from an Axios response. */
function extractError(error: unknown): never {
    const apiError = (error as { response?: { data?: ApiResponse } }).response?.data;
    throw new Error(apiError?.code || apiError?.message || "UNKNOWN_ERROR");
}

export const appsService = {

    /**
     * GET /api/v1/apps
     * Returns all apps belonging to the current merchant.
     */
    async list(): Promise<AppResponse[]> {
        try {
            const response = await client.get<ApiResponse<AppResponse[]>>("/apps");
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data ?? [];
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * GET /api/v1/apps/production
     * Returns only PRODUCTION apps.
     */
    async listProduction(): Promise<AppResponse[]> {
        try {
            const response = await client.get<ApiResponse<AppResponse[]>>("/apps/production");
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data ?? [];
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * GET /api/v1/apps/sandbox
     * Returns only SANDBOX apps.
     */
    async listSandbox(): Promise<AppResponse[]> {
        try {
            const response = await client.get<ApiResponse<AppResponse[]>>("/apps/sandbox");
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data ?? [];
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * GET /api/v1/apps/{id}
     * Returns a single app by its ID.
     */
    async getById(id: string): Promise<AppResponse> {
        try {
            const response = await client.get<ApiResponse<AppResponse>>(`/apps/${id}`);
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data;
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * POST /api/v1/apps
     * Creates a new app. Returns AppResponse with apiKeys (PUBLIC + SECRET) visible only now.
     */
    async create(data: CreateAppRequest): Promise<AppResponse> {
        try {
            const response = await client.post<ApiResponse<AppResponse>>("/apps", data);
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data;
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * PUT /api/v1/apps/{id}
     * Updates mutable app fields. Environment is not changeable after creation.
     */
    async update(id: string, data: UpdateAppRequest): Promise<AppResponse> {
        try {
            const response = await client.put<ApiResponse<AppResponse>>(`/apps/${id}`, data);
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data;
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * DELETE /api/v1/apps/{id}
     * Deletes an app.
     */
    async remove(id: string): Promise<void> {
        try {
            await client.delete<ApiResponse>(`/apps/${id}`);
        } catch (error) {
            extractError(error);
        }
    },

    // ── API Keys ──────────────────────────────────────────────────────────────

    /**
     * GET /api/v1/apps/{appId}/keys
     * Lists current API keys (secretKey not included).
     */
    async getKeys(appId: string): Promise<ApiKeyResponse[]> {
        try {
            const response = await client.get<ApiResponse<ApiKeyResponse[]>>(`/apps/${appId}/keys`);
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data ?? [];
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * POST /api/v1/apps/{appId}/keys
     * Revokes all active keys and generates new ones.
     * Returns ApiKeyResponse[] with secretKey visible only now.
     */
    async rotateKeys(appId: string): Promise<ApiKeyResponse[]> {
        try {
            const response = await client.post<ApiResponse<ApiKeyResponse[]>>(`/apps/${appId}/keys`);
            if (!response.data.success) throw new Error(response.data.code || "UNKNOWN_ERROR");
            return response.data.data ?? [];
        } catch (error) {
            extractError(error);
        }
    },

    /**
     * DELETE /api/v1/apps/{appId}/keys/{keyId}
     * Revokes a single API key.
     */
    async revokeKey(appId: string, keyId: string): Promise<void> {
        try {
            await client.delete<ApiResponse>(`/apps/${appId}/keys/${keyId}`);
        } catch (error) {
            extractError(error);
        }
    },
};
