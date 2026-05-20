"use client";

import { useTranslations, useLocale } from "next-intl";
import { Wallet, Clock, ArrowDownRight } from "lucide-react";
import { OverviewStatsGrid } from "@/components/merchant/overview/overview-stats-grid";
import { OverviewStat } from "@/lib/data/dashboard";
import { WithdrawalBalance } from "@/features/merchant/withdrawals/types";
import { formatAmount } from "@/lib/utils";

interface WithdrawalsBalanceProps {
    balances: WithdrawalBalance[];
    loading?: boolean;
}

export function WithdrawalsBalance({ balances, loading }: WithdrawalsBalanceProps) {
    const t      = useTranslations("Dashboard.Withdrawals");
    const locale = useLocale();

    const xaf       = balances.find((b) => b.currency === "XAF");
    const available = xaf?.availableAmount ?? 0;
    const pending   = xaf?.pendingAmount   ?? 0;

    const stats: OverviewStat[] = [
        {
            label: t("availableBalance"),
            value: formatAmount(available, "XAF", locale),
            icon: <Wallet className="h-5 w-5" />,
            iconWrapClassName: "bg-primary/10 text-primary",
        },
        {
            label: t("pendingBalance"),
            value: formatAmount(pending, "XAF", locale),
            icon: <Clock className="h-5 w-5" />,
            iconWrapClassName: "bg-amber-500/10 text-amber-600",
        },
        {
            label: t("totalBalance"),
            value: formatAmount(available + pending, "XAF", locale),
            icon: <ArrowDownRight className="h-5 w-5" />,
            iconWrapClassName: "bg-emerald-500/10 text-emerald-600",
        },
    ];

    return <OverviewStatsGrid stats={stats} isLoading={loading} />;
}
