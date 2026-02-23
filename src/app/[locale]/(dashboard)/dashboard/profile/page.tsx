"use client";

import { useTranslations } from "next-intl";

export default function ProfilePage() {
    const t = useTranslations('Dashboard.Header');
    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <h1 className="text-2xl font-bold">{t('profile')}</h1>
            <div className="bg-card border rounded-lg p-8 text-center text-muted-foreground">
                User Profile management content.
            </div>
        </div>
    );
}
