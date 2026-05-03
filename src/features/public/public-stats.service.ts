import { client } from "@/lib/api/client";
import { parseApiResponse } from "@/lib/api/response";
import { ApiResponse } from "@/lib/api/types";

export interface PublicStats {
    merchantCount: number;
    transactionCount: number;
    paymentMethodCount: number;
}

export const publicStatsService = {
    async get(): Promise<PublicStats> {
        const response = await client.get<ApiResponse<PublicStats>>("/public/stats");
        return parseApiResponse(response.data, response.status)!;
    },
};
