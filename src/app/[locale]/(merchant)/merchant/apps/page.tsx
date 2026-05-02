"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { AppsGrid } from "@/components/merchant/apps/apps-grid";
import { ApplicationData } from "@/components/merchant/apps/app-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { appsService } from "@/features/merchant/apps";

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
                status: app.status,
                activeKeyEnvironment: app.activeKeyEnvironment,
                currency: app.currency,
                createdAt: app.createdAt,
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
        <div className="space-y-8">
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">{t("title")}</h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1 truncate">{t("subtitle")}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {/* Mobile: icon only */}
                    <Button className="sm:hidden h-9 w-9 p-0 shadow-lg shadow-primary/20" asChild>
                        <Link href="/merchant/apps/new" aria-label={t("createApp")}>
                            <Plus className="h-4 w-4" />
                        </Link>
                    </Button>
                    {/* Desktop: icon + text */}
                    <Button className="hidden sm:inline-flex gap-2 font-bold shadow-lg shadow-primary/20" asChild>
                        <Link href="/merchant/apps/new">
                            <Plus className="h-4 w-4" />
                            {t("createApp")}
                        </Link>
                    </Button>
                </div>
            </div>

            <AppsGrid
                applications={apps}
                onSettingsClick={(id) => router.push(`/merchant/apps/${id}`)}
                onRefresh={loadApps}
                isLoading={isLoading}
            />
        </div>
    );
}
