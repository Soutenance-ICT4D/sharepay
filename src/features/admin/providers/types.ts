export type PaymentProviderType = "MOBILE_MONEY" | "BANK_TRANSFER" | "CARD" | "CRYPTO" | "WALLET";

export interface AdminProviderResponse {
    id: string;
    code: string;
    name: string;
    type: PaymentProviderType;
    country: string;
    currency: string;
    active: boolean;
    feePercentage: number;
    feeFixed: number;
    minAmount: number;
    maxAmount: number;
    createdAt: string;
    updatedAt: string;
}

export interface UpsertProviderRequest {
    code: string;
    name: string;
    type: PaymentProviderType;
    country: string;
    currency: string;
    feePercentage: number;
    feeFixed: number;
    minAmount: number;
    maxAmount: number;
}
