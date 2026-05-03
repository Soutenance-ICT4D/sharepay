"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { MOCK_TRANSACTIONS, MockTransaction } from "@/components/merchant/transactions/mock-data";
import { TransactionsStatsCards } from "@/components/merchant/transactions/transactions-stats-cards";
import { TransactionsChart } from "@/components/merchant/transactions/transactions-chart";
import { TransactionsTable } from "@/components/merchant/transactions/transactions-table";
import { TransactionDetailSheet } from "@/components/merchant/transactions/transaction-detail-sheet";

export default function TransactionsPage() {
    const t = useTranslations("Dashboard.Transactions");
    const [selectedTx, setSelectedTx] = useState<MockTransaction | null>(null);

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

            <TransactionsStatsCards transactions={MOCK_TRANSACTIONS} />

            <TransactionsChart transactions={MOCK_TRANSACTIONS} />

            <TransactionsTable data={MOCK_TRANSACTIONS} onRowClick={setSelectedTx} />

            <TransactionDetailSheet
                transaction={selectedTx}
                open={selectedTx !== null}
                onClose={() => setSelectedTx(null)}
            />
        </div>
    );
}
