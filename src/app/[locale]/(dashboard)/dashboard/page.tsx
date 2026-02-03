"use client";

import { useTranslations } from "next-intl";

export default function DashboardPage() {
    const t = useTranslations('Dashboard.Overview');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
            <p className="text-muted-foreground">
                {t('welcome')}
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Example Cards */}
                <div className="p-6 bg-card rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">{t('stats.revenue')}</div>
                    <div className="text-2xl font-bold mt-2">XAF 0</div>
                </div>
                <div className="p-6 bg-card rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">{t('stats.activeLinks')}</div>
                    <div className="text-2xl font-bold mt-2">0</div>
                </div>
                <div className="p-6 bg-card rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">{t('stats.transactions')}</div>
                    <div className="text-2xl font-bold mt-2">0</div>
                </div>
                <div className="p-6 bg-card rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">{t('stats.customers')}</div>
                    <div className="text-2xl font-bold mt-2">0</div>
                </div>
            </div>
        </div>
    );
}
