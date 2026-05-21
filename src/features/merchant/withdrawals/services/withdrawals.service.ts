import { client } from "@/lib/api/client";
import { parseApiResponse } from "@/lib/api/response";
import { ApiResponse } from "@/lib/api/types";
import {
    WithdrawAccount,
    WithdrawProvider,
    WithdrawRequest,
    WithdrawResult,
    WithdrawalBalance,
    WithdrawalConfig,
} from "@/features/merchant/withdrawals/types";

export const withdrawalsService = {

    // ── Solde ────────────────────────────────────────────────────────────────

    async getBalance(): Promise<WithdrawalBalance[]> {
        const response = await client.get<ApiResponse<WithdrawalBalance[]>>("/api/v1/merchants/balance");
        return parseApiResponse(response.data, response.status) ?? [];
    },

    // ── Providers ────────────────────────────────────────────────────────────

    async getProviders(): Promise<WithdrawProvider[]> {
        const response = await client.get<ApiResponse<WithdrawProvider[]>>("/api/v1/merchants/providers");
        return parseApiResponse(response.data, response.status) ?? [];
    },

    // ── Comptes de retrait ────────────────────────────────────────────────────

    async getAccounts(): Promise<WithdrawAccount[]> {
        const response = await client.get<ApiResponse<WithdrawAccount[]>>("/api/v1/merchants/withdrawals/accounts");
        return parseApiResponse(response.data, response.status) ?? [];
    },

    async addAccount(data: {
        providerCode: string;
        accountNumber: string;
        accountName: string;
        isDefault: boolean;
    }): Promise<WithdrawAccount> {
        const response = await client.post<ApiResponse<WithdrawAccount>>("/api/v1/merchants/withdrawals/accounts", data);
        return parseApiResponse(response.data, response.status)!;
    },

    async deleteAccount(accountId: string): Promise<void> {
        await client.delete(`/api/v1/merchants/withdrawals/accounts/${accountId}`);
    },

    async setDefaultAccount(accountId: string): Promise<WithdrawAccount> {
        const response = await client.patch<ApiResponse<WithdrawAccount>>(
            `/api/v1/merchants/withdrawals/accounts/${accountId}/default`
        );
        return parseApiResponse(response.data, response.status)!;
    },

    // ── Configuration ─────────────────────────────────────────────────────────

    async getConfig(): Promise<WithdrawalConfig> {
        const response = await client.get<ApiResponse<WithdrawalConfig>>("/api/v1/merchants/withdrawals/config");
        return parseApiResponse(response.data, response.status) ?? { mode: "MANUAL", account: null, thresholdAmount: null, period: null, currency: "XAF", lastTriggeredAt: null, updatedAt: null };
    },

    async updateConfig(data: {
        mode: string;
        accountId?: string | null;
        thresholdAmount?: number | null;
        period?: string | null;
    }): Promise<WithdrawalConfig> {
        const response = await client.put<ApiResponse<WithdrawalConfig>>("/api/v1/merchants/withdrawals/config", data);
        return parseApiResponse(response.data, response.status)!;
    },

    // ── Retrait manuel ────────────────────────────────────────────────────────

    async withdraw(request: WithdrawRequest): Promise<WithdrawResult> {
        const response = await client.post<ApiResponse<WithdrawResult>>("/api/v1/merchants/withdrawals/withdraw", request);
        return parseApiResponse(response.data, response.status)!;
    },
};
