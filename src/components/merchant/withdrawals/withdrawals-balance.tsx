"use client";

import { useTranslations } from "next-intl";
import { Wallet, ArrowDownRight, Activity } from "lucide-react";
import { OverviewStatsGrid } from "@/components/merchant/overview/overview-stats-grid";
import { OverviewStat } from "@/lib/data/dashboard";

interface WithdrawalsBalanceProps {
    balances: {
        available: number;
        totalWithdrawn: number;
        globalFlow: number;
    };
}

export function WithdrawalsBalance({ balances }: WithdrawalsBalanceProps) {
    const t = useTranslations('Dashboard.Withdrawals');

    const availableBalanceStr = new Intl.NumberFormat('fr-FR').format(balances.available);
    const totalWithdrawnStr = new Intl.NumberFormat('fr-FR').format(balances.totalWithdrawn);
    const globalFlowStr = new Intl.NumberFormat('fr-FR').format(balances.globalFlow);

    const stats: OverviewStat[] = [
        {
            label: t("availableBalance"),
            value: `${availableBalanceStr} FCFA`,
            icon: <Wallet className="h-5 w-5" />,
            iconWrapClassName: "bg-primary/10 text-primary",
        },
        {
            label: t("totalWithdrawn"),
            value: `${totalWithdrawnStr} FCFA`,
            icon: <ArrowDownRight className="h-5 w-5" />,
            iconWrapClassName: "bg-emerald-500/10 text-emerald-600",
        },
        {
            label: t("globalFlow"),
            value: `${globalFlowStr} FCFA`,
            icon: <Activity className="h-5 w-5" />,
            iconWrapClassName: "bg-blue-500/10 text-blue-600",
        },
    ];

    return (
        <OverviewStatsGrid stats={stats} />
    );
}
