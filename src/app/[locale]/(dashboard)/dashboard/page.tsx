"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/core/i18n/routing";
import { OverviewPageHeading } from "@/components/dashboard/overview/overview-page-heading";
import { OverviewStatsGrid } from "@/components/dashboard/overview/overview-stats-grid";
import { OverviewTransactionChartCard } from "@/components/dashboard/overview/overview-transaction-chart-card";

import { OverviewRecentActivity } from "@/components/dashboard/overview/overview-recent-activity";
import {
    type OverviewStat,
    type OverviewActivityItem,
} from "@/core/data/dashboard";
import { OverviewInsightCard } from "@/components/dashboard/overview/overview-insight-card";
import {
    Activity,
    Banknote,
    Bolt,
    ShoppingCart,
    TriangleAlert,
    RefreshCw,
    Hourglass,
} from "lucide-react";

import { buildSeries, DateRangePreset } from "@/core/data/dashboard";

export default function DashboardPage() {
    const router = useRouter();

    const [rangePreset, setRangePreset] = useState<DateRangePreset>("last30");
    const [rangeCustom, setRangeCustom] = useState<{ from?: string; to?: string }>({});

    const chartData = useMemo(() => {
        return buildSeries({ preset: rangePreset, from: rangeCustom.from, to: rangeCustom.to });
    }, [rangePreset, rangeCustom.from, rangeCustom.to]);

    const stats: OverviewStat[] = [
        {
            label: "Solde disponible",
            value: "42 500 FCFA",
            badge: {
                label: "+2.4%",
                className: "text-emerald-600 bg-emerald-500/10",
            },
            icon: <Banknote className="h-5 w-5" />,
            iconWrapClassName: "bg-emerald-500/10 text-emerald-600",
            progress: {
                value: 65,
                className: "bg-emerald-500",
            },
        },
        {
            label: "Règlements en cours",
            value: "12 340 FCFA",
            badge: {
                label: "En attente",
                className: "text-amber-600 bg-amber-500/10",
            },
            icon: <Hourglass className="h-5 w-5" />,
            iconWrapClassName: "bg-amber-500/10 text-amber-600",
            progress: {
                value: 40,
                className: "bg-amber-500",
            },
        },
        {
            label: "Volume aujourd'hui",
            value: "3 890 FCFA",
            badge: {
                label: "+12.0%",
                className: "text-primary bg-primary/10",
            },
            icon: <Activity className="h-5 w-5" />,
            iconWrapClassName: "bg-primary/10 text-primary",
            progress: {
                value: 85,
                className: "bg-primary",
            },
        },
    ];

    const activity: OverviewActivityItem[] = [
        {
            id: "order-8921",
            title: "Commande #8921",
            meta: "Il y a 2 min • Visa **** 4242",
            amount: "+12 500 FCFA",
            status: "Succès",
            amountClassName: "text-emerald-600",
            statusClassName: "text-emerald-600/70",
            icon: <ShoppingCart className="h-5 w-5" />,
            iconWrapClassName: "bg-emerald-500/10 text-emerald-600",
        },
        {
            id: "refund-8915",
            title: "Remboursement #8915",
            meta: "Il y a 14 min • Portefeuille",
            amount: "-4 200 FCFA",
            status: "Traité",
            amountClassName: "text-foreground",
            statusClassName: "text-muted-foreground",
            icon: <RefreshCw className="h-5 w-5" />,
            iconWrapClassName: "bg-muted text-muted-foreground",
        },
        {
            id: "failed-8910",
            title: "Échec Paiement #8910",
            meta: "Il y a 1h • Mastercard **** 1111",
            amount: "0 FCFA",
            status: "Refusé",
            amountClassName: "text-red-600",
            statusClassName: "text-red-600/70",
            icon: <TriangleAlert className="h-5 w-5" />,
            iconWrapClassName: "bg-red-500/10 text-red-600",
        },
        {
            id: "order-8905",
            title: "Commande #8905",
            meta: "Il y a 3h • Apple Pay",
            amount: "+25 000 FCFA",
            status: "En attente",
            amountClassName: "text-amber-600",
            statusClassName: "text-amber-600/70",
            icon: <ShoppingCart className="h-5 w-5" />,
            iconWrapClassName: "bg-amber-500/10 text-amber-600",
        },
    ];

    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <OverviewPageHeading
                title="Vue d'ensemble"
                subtitle="Bienvenue, voici l'état de votre activité aujourd'hui."
                onPayout={() => router.push("/dashboard/payout")}
                onDateRangeChange={(preset, range) => {
                    setRangePreset(preset);
                    setRangeCustom(range ?? {});
                }}
            />

            <OverviewStatsGrid stats={stats} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <OverviewTransactionChartCard
                    title="Flux de transactions"
                    subtitle="Évolution sur la période sélectionnée"
                    data={chartData}
                />
                <OverviewRecentActivity
                    title="Activité récente"
                    viewAllLabel="Tout voir"
                    items={activity}
                    onViewAll={() => router.push("/dashboard/transactions")}
                    onLoadMore={() => router.push("/dashboard/transactions")}
                />
            </div>

            <OverviewInsightCard
                title="Conseil d'optimisation"
                description="Votre taux de conversion a augmenté de 5% ce mois-ci. Activez les paiements en un clic pour réduire l'abandon de panier de 15% supplémentaires."
                icon={<Bolt className="h-8 w-8" />}
                actionLabel="En savoir plus"
            />
        </div>
    );
}
