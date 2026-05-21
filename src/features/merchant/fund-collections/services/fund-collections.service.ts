import { client } from "@/lib/api/client";
import { parseApiResponse } from "@/lib/api/response";
import { ApiResponse } from "@/lib/api/types";
import {
    FundCollectionResponse,
    FundCollectionStatus,
    CreateFundCollectionRequest,
    UpdateFundCollectionRequest,
} from "@/features/merchant/fund-collections/types";

export const fundCollectionsService = {

    async list(filters?: {
        applicationId?: string;
        status?: FundCollectionStatus;
    }): Promise<FundCollectionResponse[]> {
        const params = new URLSearchParams();
        if (filters?.applicationId) params.append("applicationId", filters.applicationId);
        if (filters?.status) params.append("status", filters.status);
        const query = params.toString() ? `?${params}` : "";
        const response = await client.get<ApiResponse<FundCollectionResponse[]>>(
            `/api/v1/merchants/fund-collections${query}`
        );
        return parseApiResponse(response.data, response.status) ?? [];
    },

    async getById(id: string): Promise<FundCollectionResponse> {
        const response = await client.get<ApiResponse<FundCollectionResponse>>(
            `/api/v1/merchants/fund-collections/${id}`
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async create(
        applicationId: string,
        data: CreateFundCollectionRequest
    ): Promise<FundCollectionResponse> {
        const response = await client.post<ApiResponse<FundCollectionResponse>>(
            `/api/v1/merchants/apps/${applicationId}/fund-collections`,
            data
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async update(
        id: string,
        data: UpdateFundCollectionRequest
    ): Promise<FundCollectionResponse> {
        const response = await client.patch<ApiResponse<FundCollectionResponse>>(
            `/api/v1/merchants/fund-collections/${id}`,
            data
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async close(id: string): Promise<FundCollectionResponse> {
        const response = await client.patch<ApiResponse<FundCollectionResponse>>(
            `/api/v1/merchants/fund-collections/${id}/close`
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async reopen(id: string): Promise<FundCollectionResponse> {
        const response = await client.patch<ApiResponse<FundCollectionResponse>>(
            `/api/v1/merchants/fund-collections/${id}/reopen`
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async remove(id: string): Promise<void> {
        await client.delete(`/api/v1/merchants/fund-collections/${id}`);
    },
};
