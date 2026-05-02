"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { WithdrawalsBalance } from "@/components/merchant/withdrawals/withdrawals-balance";
import { WithdrawalsForm } from "@/components/merchant/withdrawals/withdrawals-form";
import { WithdrawalsMethods, PaymentMethod } from "@/components/merchant/withdrawals/withdrawals-methods";
import { WithdrawalsHistoryTable, Withdrawal } from "@/components/merchant/withdrawals/withdrawals-history-table";
import { WithdrawalsConfigModal, WithdrawalType } from "@/components/merchant/withdrawals/withdrawals-config-modal";

interface WithdrawalsClientPageProps {
    title: string;
    subtitle: string;
}

export function WithdrawalsClientPage({ title, subtitle }: WithdrawalsClientPageProps) {
    // 1. Centralized State
    const [configType, setConfigType] = useState<WithdrawalType>("manual");

    // Default Mock Data
    const [balances, setBalances] = useState({
        available: 1500000,
        totalWithdrawn: 5450000,
        globalFlow: 6950000,
    });

    const [methods, setMethods] = useState<PaymentMethod[]>([
        { id: "1", type: "momo", provider: "MTN Mobile Money", details: "+225 05 ** ** ** 12", default: true },
        { id: "2", type: "card", provider: "Carte Visa", details: "**** **** **** 4242", default: false },
    ]);

    const [history, setHistory] = useState<Withdrawal[]>([
        { id: "wd_001", date: new Date(2023, 9, 24, 14, 30), amount: 50000, destination: "MTN MoMo - •••• 1234", status: "completed" },
        { id: "wd_002", date: new Date(2023, 10, 2, 9, 15), amount: 15000, destination: "Carte Visa - •••• 4242", status: "failed" },
        { id: "wd_003", date: new Date(2023, 10, 15, 16, 45), amount: 75000, destination: "MTN MoMo - •••• 1234", status: "pending" },
        { id: "wd_004", date: new Date(2023, 10, 20, 11, 20), amount: 120000, destination: "Carte Visa - •••• 4242", status: "completed" },
        { id: "wd_005", date: new Date(2023, 11, 5, 8, 0), amount: 25000, destination: "MTN MoMo - •••• 1234", status: "completed" },
        { id: "wd_006", date: new Date(2024, 0, 12, 14, 30), amount: 90000, destination: "Carte Visa - •••• 4242", status: "completed" },
        { id: "wd_007", date: new Date(2024, 1, 3, 10, 15), amount: 45000, destination: "MTN MoMo - •••• 1234", status: "pending" },
    ]);

    // 2. Handlers
    const handleSaveConfig = (newType: WithdrawalType) => {
        setConfigType(newType);
    };

    return (
        <div className="space-y-8">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        {title}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground font-medium mt-1">
                        {subtitle}
                    </p>
                </div>
                <WithdrawalsConfigModal
                    currentType={configType}
                    onSave={handleSaveConfig}
                />
            </div>

            {/* Top Section */}
            <WithdrawalsBalance balances={balances} />

            {/* Middle Section: Grid -> Form + Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <WithdrawalsForm disabled={configType !== "manual"} />
                <WithdrawalsMethods methods={methods} />
            </div>

            {/* Bottom Section: History */}
            <WithdrawalsHistoryTable history={history} />
        </div>
    );
}
