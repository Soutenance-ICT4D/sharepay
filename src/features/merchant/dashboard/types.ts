export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "REFUNDED";
export type TransactionType = "CHECKOUT" | "CHARGE" | "FUND_COLLECTION";

export type ChartInterval = "TODAY" | "LAST_7_DAYS" | "LAST_30_DAYS";
export type ChartGroupBy  = "STATUS" | "PROVIDER" | "APPLICATION";

export interface ChartSeriesItem {
    key: string;
    counts: number[];
    volumes: number[];
}

export interface TransactionChartData {
    interval: ChartInterval;
    groupBy: ChartGroupBy;
    currency: string;
    labels: string[];
    series: ChartSeriesItem[];
}

export interface TransactionSummary {
    id: string;
    reference: string;
    merchantReference: string | null;
    type: TransactionType;
    amount: number;
    netAmount: number;
    currency: string;
    status: TransactionStatus;
    description: string | null;
    provider: string | null;
    payerAccount: string | null;
    updatedAt: string;
}

export interface MerchantDashboardData {
    availableBalance: number;
    pendingBalance: number;
    currency: string;
    dailyVolume: number;
    todayTransactionCount: number;
    todayTransactions: TransactionSummary[];
    lastFiveTransactions: TransactionSummary[];
}
