import { client } from "@/lib/api/client";
import { parseApiResponse } from "@/lib/api/response";
import { ApiResponse } from "@/lib/api/types";
import {
    AppWebhookResponse,
    TestWebhookResponse,
    WebhookDeliveryResponse,
    WebhookDeliveryStatus,
    SpringPage,
} from "@/features/merchant/apps/types";

export const webhookService = {

    async getConfig(appId: string): Promise<AppWebhookResponse> {
        const response = await client.get<ApiResponse<AppWebhookResponse>>(`/apps/${appId}/webhook`);
        return parseApiResponse(response.data, response.status)!;
    },

    async updateUrl(appId: string, webhookUrl: string | null): Promise<AppWebhookResponse> {
        const response = await client.patch<ApiResponse<AppWebhookResponse>>(
            `/apps/${appId}/webhook`,
            { webhookUrl }
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async createSecret(appId: string): Promise<AppWebhookResponse> {
        const response = await client.post<ApiResponse<AppWebhookResponse>>(`/apps/${appId}/webhook/secret`, {});
        return parseApiResponse(response.data, response.status)!;
    },

    async rotateSecret(appId: string): Promise<AppWebhookResponse> {
        const response = await client.post<ApiResponse<AppWebhookResponse>>(`/apps/${appId}/webhook/rotate`, {});
        return parseApiResponse(response.data, response.status)!;
    },

    async revokeSecret(appId: string): Promise<void> {
        await client.delete(`/apps/${appId}/webhook/secret`);
    },

    async test(appId: string, data?: Record<string, unknown>): Promise<TestWebhookResponse> {
        const response = await client.post<ApiResponse<TestWebhookResponse>>(
            `/apps/${appId}/webhook/test`,
            data ? { data } : {}
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async listDeliveries(
        appId: string,
        params?: { status?: WebhookDeliveryStatus; page?: number; size?: number }
    ): Promise<SpringPage<WebhookDeliveryResponse>> {
        const q = new URLSearchParams();
        if (params?.status) q.append("status", params.status);
        if (params?.page !== undefined) q.append("page", String(params.page));
        if (params?.size !== undefined) q.append("size", String(params.size));
        const query = q.toString() ? `?${q}` : "";
        const response = await client.get<ApiResponse<SpringPage<WebhookDeliveryResponse>>>(
            `/apps/${appId}/webhook/deliveries${query}`
        );
        return parseApiResponse(response.data, response.status)!;
    },

    async replayDelivery(appId: string, deliveryId: string): Promise<WebhookDeliveryResponse> {
        const response = await client.post<ApiResponse<WebhookDeliveryResponse>>(
            `/apps/${appId}/webhook/deliveries/${deliveryId}/replay`,
            {}
        );
        return parseApiResponse(response.data, response.status)!;
    },
};
