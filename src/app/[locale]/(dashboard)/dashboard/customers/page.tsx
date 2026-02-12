"use client";

import { useTranslations } from "next-intl";

export default function CustomersPage() {
    const t = useTranslations('Dashboard.Sidebar');
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">{t('customers')}</h1>
            <div className="bg-card border rounded-lg p-8 text-center text-muted-foreground">
                Coming soon: {t('customers')} list.
            </div>
        </div>
    );
}
