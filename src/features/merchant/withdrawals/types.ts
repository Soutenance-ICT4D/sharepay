export interface WithdrawProvider {
    code: string;
    name: string;
    type: string;
    currency: string;
    minAmount: number | null;
    maxAmount: number | null;
}

export type ProviderType = "MOBILE_MONEY" | "BANK_TRANSFER" | "BANK_CARD";

export interface WithdrawAccount {
    id: string;
    providerCode: string;
    providerName: string;
    providerType: ProviderType;
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

export type WithdrawalMode = "MANUAL" | "INSTANT" | "THRESHOLD" | "PERIODIC";
export type WithdrawalPeriod = "DAILY" | "WEEKLY" | "MONTHLY";

export interface WithdrawalConfig {
    mode: WithdrawalMode;
    account: WithdrawAccount | null;
    thresholdAmount: number | null;
    period: WithdrawalPeriod | null;
    currency: string;
    lastTriggeredAt: string | null;
    updatedAt: string | null;
}
