import { ApiResponse } from "@/lib/api/types";

export type { ApiResponse };

export type AppStatus         = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type AppKeyEnvironment = "LIVE" | "TEST";

export interface ApiKeyResponse {
    id: string;
    name: string;
    keyPrefix: string;
    environment: AppKeyEnvironment;
    active: boolean;
    plainTextKey?: string;        // full key — returned only once at creation/rotation
    lastUsedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateApiKeyRequest {
    name: string;
    environment: AppKeyEnvironment;
}

export interface RotateApiKeyRequest {
    name: string;
    environment: AppKeyEnvironment;
}

export interface AppResponse {
    id: string;
    name: string;
    description: string;
    status: AppStatus;
    currency: string;
    themeColor: string | null;
    logoUrl: string | null;
    websiteUrl: string | null;
    webhookUrl: string | null;
    plainTextWebhookSecret?: string; // visible once at creation
    successUrl: string | null;
    cancelUrl: string | null;
    activeKeyPrefix: string | null;
    activeKeyEnvironment: AppKeyEnvironment | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAppRequest {
    name: string;
    description?: string;
    logoUrl?: string | null;
    websiteUrl?: string;
    themeColor?: string;
    currency: string;
    webhookUrl?: string;
    successUrl?: string;
    cancelUrl?: string;
}

export interface UpdateAppRequest {
    name?: string;
    description?: string;
    logoUrl?: string | null;
    websiteUrl?: string;
    themeColor?: string;
    webhookUrl?: string;
    successUrl?: string;
    cancelUrl?: string;
}
