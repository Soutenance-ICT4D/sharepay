"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { TransactionsStats } from "@/components/dashboard/transactions/transactions-stats";
import { TransactionsAppSelector, Application } from "@/components/dashboard/transactions/transactions-app-selector";
import { TransactionsTable, Transaction } from "@/components/dashboard/transactions/transactions-table";

// Centralized Mock Data
const MOCK_APPS: Application[] = [
    { id: "app_1", name: "E-commerce Store" },
    { id: "app_2", name: "Booking System" },
    { id: "app_3", name: "Subscription Service" },
];

const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 45 }).map((_, i) => ({
    id: `txn_${Math.random().toString(36).substring(2, 10)}`,
    phone: `+225 0${Math.floor(Math.random() * 9)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
    amount: Math.floor(1000 + Math.random() * 50000),
    status: ["success", "success", "success", "pending", "failed"][Math.floor(Math.random() * 5)] as "success" | "pending" | "failed",
    date: new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toISOString(),
    source: MOCK_APPS[i % MOCK_APPS.length].name,
}));

export default function TransactionsPage() {
    const t = useTranslations("Dashboard.Transactions");
    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

    // Derived state for stats and table
    const filteredTransactions = useMemo(() => {
        if (!selectedAppId) return MOCK_TRANSACTIONS;
        const selectedAppName = MOCK_APPS.find(app => app.id === selectedAppId)?.name;
        return MOCK_TRANSACTIONS.filter((txn) => txn.source === selectedAppName);
    }, [selectedAppId]);

    const stats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];

        let availableBalance = 0;
        let todayCount = 0;
        let todayWithdrawalsCount = 0; // Mock

        filteredTransactions.forEach(txn => {
            if (txn.status === "success") {
                availableBalance += txn.amount;
            }
            if (txn.date.startsWith(today)) {
                todayCount++;
            }
        });

        // Mock some withdrawals data based on the app
        todayWithdrawalsCount = Math.floor(todayCount / 4);

        return {
            balance: availableBalance,
            todayTransactions: todayCount,
            todayWithdrawals: todayWithdrawalsCount,
        };
    }, [filteredTransactions]);

    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
            </div>

            <TransactionsAppSelector
                applications={MOCK_APPS}
                selectedAppId={selectedAppId}
                onSelectApp={setSelectedAppId}
            />

            <TransactionsStats
                balance={stats.balance}
                todayTransactions={stats.todayTransactions}
                todayWithdrawals={stats.todayWithdrawals}
            />

            <TransactionsTable data={filteredTransactions} />
        </div>
    );
}
