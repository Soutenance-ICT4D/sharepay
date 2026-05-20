export interface WithdrawProvider {
    code: string;
    name: string;
    type: string;
    currency: string;
    minAmount: number | null;
    maxAmount: number | null;
}

export interface WithdrawAccount {
    id: string;
    providerCode: string;
    providerName: string;
    accountNumber: string;
    accountName: string;
    isDefault: boolean;
}

export interface WithdrawRequest {
    amount: number;
    currency: string;
    paymentMethod: string;
    beneficiaryAccount: string;
    beneficiaryName: string;
    description?: string;
    merchantReference?: string;
}

export interface WithdrawResult {
    reference: string;
    status: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    beneficiaryAccount: string;
    beneficiaryName: string;
}

export interface WithdrawalBalance {
    availableAmount: number;
    pendingAmount: number;
    currency: string;
}
