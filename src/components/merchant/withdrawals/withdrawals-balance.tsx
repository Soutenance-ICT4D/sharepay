"use client";

import { useTranslations } from "next-intl";
import { Wallet, Clock, ArrowDownRight } from "lucide-react";
import { OverviewStatsGrid } from "@/components/merchant/overview/overview-stats-grid";
import { OverviewStat } from "@/lib/data/dashboard";
import { WithdrawalBalance } from "@/features/merchant/withdrawals/types";

interface WithdrawalsBalanceProps {
    balances: WithdrawalBalance[];
    loading?: boolean;
}

export function WithdrawalsBalance({ balances, loading }: WithdrawalsBalanceProps) {
    const t = useTranslations("Dashboard.Withdrawals");

    const xaf = balances.find((b) => b.currency === "XAF");
    const available = xaf?.available ?? 0;
    const pending   = xaf?.pending   ?? 0;

    const fmt = (n: number) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(n);

    const skeleton = loading && balances.length === 0;

    const stats: OverviewStat[] = [
        {
            label: t("availableBalance"),
            value: skeleton ? "—" : fmt(available),
            icon: <Wallet className="h-5 w-5" />,
            iconWrapClassName: "bg-primary/10 text-primary",
        },
        {
            label: t("pendingBalance"),
            value: skeleton ? "—" : fmt(pending),
            icon: <Clock className="h-5 w-5" />,
            iconWrapClassName: "bg-amber-500/10 text-amber-600",
        },
        {
            label: t("totalBalance"),
            value: skeleton ? "—" : fmt(available + pending),
            icon: <ArrowDownRight className="h-5 w-5" />,
            iconWrapClassName: "bg-emerald-500/10 text-emerald-600",
        },
    ];

    return <OverviewStatsGrid stats={stats} />;
}
