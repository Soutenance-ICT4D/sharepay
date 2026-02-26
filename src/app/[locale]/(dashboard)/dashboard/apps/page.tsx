"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/core/i18n/routing";
import { AppsGrid } from "@/components/dashboard/apps/apps-grid";
import { ApplicationData } from "@/components/dashboard/apps/app-card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { appsService } from "@/core/services/apps.service";

export default function AppsPage() {
    const t = useTranslations("Dashboard.Apps");
    const router = useRouter();

    const [apps, setApps] = useState<ApplicationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadApps = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await appsService.list();
            const mapped: ApplicationData[] = (data ?? []).map((app) => ({
                id: app.id,
                name: app.name,
                description: app.description,
                logoUrl: app.logoUrl,
                status: app.environment,
                createdAt: app.createdAt,
                transactionCount: 0, // not in AppResponse — fetch separately if needed
            }));
            setApps(mapped);
        } catch (err) {
            console.warn("appsService.list() failed:", err);
            setApps([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { loadApps(); }, [loadApps]);

    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
                    <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="icon" onClick={loadApps} disabled={isLoading} title="Rafraîchir">
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                    <Link href="/dashboard/apps/new">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            {t("createApp")}
                        </Button>
                    </Link>
                </div>
            </div>

            <AppsGrid
                applications={apps}
                onSettingsClick={(id) => router.push(`/dashboard/apps/${id}`)}
                onDeleteSuccess={loadApps}
                isLoading={isLoading}
            />
        </div>
    );
}
