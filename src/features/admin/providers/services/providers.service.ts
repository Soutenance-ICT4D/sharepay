import { client } from "@/lib/api/client";
import { parseApiResponse } from "@/lib/api/response";
import { ApiResponse } from "@/lib/api/types";
import { AdminProviderResponse, UpsertProviderRequest } from "@/features/admin/providers/types";

export const adminProvidersService = {
    async list(): Promise<AdminProviderResponse[]> {
        const res = await client.get<ApiResponse<AdminProviderResponse[]>>("/api/v1/admin/providers");
        return parseApiResponse(res.data, res.status)!;
    },

    async create(request: UpsertProviderRequest): Promise<AdminProviderResponse> {
        const res = await client.post<ApiResponse<AdminProviderResponse>>("/api/v1/admin/providers", request);
        return parseApiResponse(res.data, res.status)!;
    },

    async update(id: string, request: UpsertProviderRequest): Promise<AdminProviderResponse> {
        const res = await client.put<ApiResponse<AdminProviderResponse>>(`/api/v1/admin/providers/${id}`, request);
        return parseApiResponse(res.data, res.status)!;
    },

    async toggle(id: string): Promise<AdminProviderResponse> {
        const res = await client.patch<ApiResponse<AdminProviderResponse>>(`/api/v1/admin/providers/${id}/toggle`);
        return parseApiResponse(res.data, res.status)!;
    },
};
