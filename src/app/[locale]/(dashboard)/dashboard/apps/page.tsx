"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/core/i18n/routing";
import { AppsGrid } from "@/components/dashboard/apps/apps-grid";
import { ApplicationData } from "@/components/dashboard/apps/app-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Temporary Mock Data
const MOCK_APPS: ApplicationData[] = [
    {
        id: "app_1",
        name: "E-commerce Store",
        description: "Intégration principale pour la boutique en ligne WooCommerce.",
        status: "live",
        createdAt: "2023-11-15T10:00:00Z",
        transactionCount: 1450
    },
    {
        id: "app_2",
        name: "Booking System",
        description: "Système de réservation pour les consultations en ligne.",
        status: "live",
        createdAt: "2024-01-20T14:30:00Z",
        transactionCount: 320
    },
    {
        id: "app_3",
        name: "Subscription Service (Test)",
        description: "Environnement de test pour le nouveau service d'abonnement récurrent.",
        status: "test",
        createdAt: "2024-02-10T09:15:00Z",
        transactionCount: 45
    }
];

export default function AppsPage() {
    const t = useTranslations('Dashboard.Apps');
    const router = useRouter();

    const handleSettingsClick = (id: string) => {
        router.push(`/dashboard/apps/${id}`);
    };

    const handleViewClick = (id: string) => {
        console.log("View clicked for:", id);
        // Navigate to details/transactions filtered for this app in the future
    };

    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
                    <p className="text-muted-foreground mt-1">{t('subtitle')}</p>
                </div>
                <Link href="/dashboard/apps/new">
                    <Button className="shrink-0 gap-2">
                        <Plus className="h-4 w-4" />
                        {t("createApp")}
                    </Button>
                </Link>
            </div>

            <AppsGrid
                applications={MOCK_APPS}
                onSettingsClick={handleSettingsClick}
                onViewClick={handleViewClick}
            />
        </div>
    );
}
