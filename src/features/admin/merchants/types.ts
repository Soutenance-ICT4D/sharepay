export type AccountStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
export type KycLevel = "NONE" | "BASIC" | "ADVANCED" | "FULL";

export interface MerchantSummaryResponse {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    country: string;
    status: AccountStatus;
    kycLevel: KycLevel;
    emailVerified: boolean;
    createdAt: string;
}

export interface PaginationResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface UpdateStatusRequest {
    status: AccountStatus;
}

export interface UpdateMerchantKycRequest {
    kycLevel: KycLevel;
}
