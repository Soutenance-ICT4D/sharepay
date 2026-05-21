import { client } from "@/lib/api/client";
import { parseApiResponse } from "@/lib/api/response";
import { ApiResponse } from "@/lib/api/types";
import {
    StaffResponse,
    PaginationResponse,
    CreateStaffRequest,
    UpdateStatusRequest,
} from "@/features/admin/staff/types";

export const adminStaffService = {
    async list(page = 0, size = 20): Promise<PaginationResponse<StaffResponse>> {
        const res = await client.get<ApiResponse<PaginationResponse<StaffResponse>>>(
            "/api/v1/admin/staff",
            { params: { page, size } }
        );
        return parseApiResponse(res.data, res.status)!;
    },

    async create(request: CreateStaffRequest): Promise<StaffResponse> {
        const res = await client.post<ApiResponse<StaffResponse>>("/api/v1/admin/staff", request);
        return parseApiResponse(res.data, res.status)!;
    },

    async updateStatus(id: string, request: UpdateStatusRequest): Promise<StaffResponse> {
        const res = await client.patch<ApiResponse<StaffResponse>>(
            `/api/v1/admin/staff/${id}/status`,
            request
        );
        return parseApiResponse(res.data, res.status)!;
    },

    async delete(id: string): Promise<void> {
        await client.delete(`/api/v1/admin/staff/${id}`);
    },
};
