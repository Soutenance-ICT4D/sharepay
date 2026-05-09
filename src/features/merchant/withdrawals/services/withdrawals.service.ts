import { client } from "@/lib/api/client";
import { parseApiResponse } from "@/lib/api/response";
import { ApiResponse } from "@/lib/api/types";
import { WithdrawProvider, WithdrawRequest, WithdrawResult, WithdrawalBalance } from "@/features/merchant/withdrawals/types";

export const withdrawalsService = {

    /** GET /merchants/balance — Soldes du marchand */
    async getBalance(): Promise<WithdrawalBalance[]> {
        const response = await client.get<ApiResponse<WithdrawalBalance[]>>("/merchants/balance");
        return parseApiResponse(response.data, response.status) ?? [];
    },

    /** GET /merchants/providers — Providers disponibles pour les retraits */
    async getProviders(): Promise<WithdrawProvider[]> {
        const response = await client.get<ApiResponse<WithdrawProvider[]>>("/merchants/providers");
        return parseApiResponse(response.data, response.status) ?? [];
    },

    /** POST /merchants/withdraw — Initier un retrait */
    async withdraw(request: WithdrawRequest): Promise<WithdrawResult> {
        const response = await client.post<ApiResponse<WithdrawResult>>("/merchants/withdraw", request);
        return parseApiResponse(response.data, response.status)!;
    },
};
