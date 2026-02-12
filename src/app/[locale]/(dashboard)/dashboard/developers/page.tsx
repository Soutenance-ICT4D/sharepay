"use client";

import { useTranslations } from "next-intl";

export default function DevelopersPage() {
    const t = useTranslations('Dashboard.Sidebar');
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">{t('developers')}</h1>
            <div className="bg-card border rounded-lg p-8 text-center text-muted-foreground">
                Coming soon: API Keys and {t('developers')} tools.
            </div>
        </div>
    );
}
