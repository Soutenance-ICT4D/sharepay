"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useTransactions } from "@/features/merchant/transactions/hooks/use-transactions";
import { Transaction, TransactionFilters } from "@/features/merchant/transactions/types";
import { TransactionsStatsCards } from "@/components/merchant/transactions/transactions-stats-cards";
import { TransactionsChart } from "@/components/merchant/transactions/transactions-chart";
import { TransactionsTable } from "@/components/merchant/transactions/transactions-table";
import { TransactionDetailSheet } from "@/components/merchant/transactions/transaction-detail-sheet";

export default function TransactionsPage() {
    const t = useTranslations("Dashboard.Transactions");

    const [filters, setFilters] = useState<TransactionFilters>({ page: 0, size: 20 });
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    const { data, loading, error, refetch } = useTransactions(filters);

    return (
        <div className="space-y-8">
            <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">
                    {t("title")}
                </h2>
                <p className="text-sm text-muted-foreground font-medium mt-1 truncate">
                    {t("subtitle")}
                </p>
            </div>

            <TransactionsStatsCards data={data} loading={loading} />

            <TransactionsChart />

            <TransactionsTable
                data={data}
                loading={loading}
                error={error}
                filters={filters}
                onFiltersChange={setFilters}
                onRowClick={setSelectedTx}
                onRefresh={refetch}
            />

            <TransactionDetailSheet
                transaction={selectedTx}
                open={selectedTx !== null}
                onClose={() => setSelectedTx(null)}
            />
        </div>
    );
}
