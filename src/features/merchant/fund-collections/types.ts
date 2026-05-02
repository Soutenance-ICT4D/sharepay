export type FundCollectionStatus = "ACTIVE" | "CLOSED" | "EXPIRED" | "DELETED";

export interface FundCollectionResponse {
    id: string;
    slug: string;
    collectUrl: string;
    title: string;
    description: string | null;
    status: FundCollectionStatus;
    currency: string;
    amountFixed: boolean;
    amount: number | null;
    coverImageUrl: string | null;
    collectCustomerInfo: boolean;
    thankYouMessage: string | null;
    expiresAt: string | null;
    applicationId: string;
    applicationName: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateFundCollectionRequest {
    title: string;
    description?: string;
    coverImageUrl?: string;
    currency?: string;
    isAmountFixed?: boolean;
    amount?: number;
    expiresAt?: string;
    collectCustomerInfo?: boolean;
    thankYouMessage?: string;
}

export interface UpdateFundCollectionRequest {
    title?: string;
    description?: string;
    coverImageUrl?: string;
    isAmountFixed?: boolean;
    amount?: number;
    expiresAt?: string;
    removeExpiresAt?: boolean;
    collectCustomerInfo?: boolean;
    thankYouMessage?: string;
}
