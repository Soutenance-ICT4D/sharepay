"use client";

import { useTranslations } from "next-intl";

export default function SettingsPage() {
    const t = useTranslations('Dashboard.Sidebar');
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">{t('settings')}</h1>
            <div className="bg-card border rounded-lg p-8 text-center text-muted-foreground">
                Settings page content goes here.
            </div>
        </div>
    );
}
