"use client";

import { useTranslations } from "next-intl";

export function DashboardHeader() {
    const t = useTranslations('Dashboard');

    return (
        <header className="h-16 border-b bg-background/50 backdrop-blur-xl flex items-center px-6 sticky top-0 z-10">
            <div className="font-semibold">{t('title')}</div>
        </header>
    );
}
