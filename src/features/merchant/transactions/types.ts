export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "REFUNDED";
export type TransactionType   = "CHECKOUT" | "CHARGE" | "FUND_COLLECTION";

export interface Transaction {
    id: string;
    reference: string;
    merchantReference: string | null;
    type: TransactionType;
    amount: number;
    feeAmount: number;
    netAmount: number;
    currency: string;
    status: TransactionStatus;
    description: string | null;
    provider: string | null;
    payerAccount: string | null;
    payerName: string | null;
    payerEmail: string | null;
    appName: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface TransactionPage {
    content: Transaction[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface TransactionFilters {
    status?: TransactionStatus | "";
    type?: TransactionType | "";
    page?: number;
    size?: number;
}
