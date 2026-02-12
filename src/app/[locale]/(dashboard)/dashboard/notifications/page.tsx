"use client";

import { useTranslations } from "next-intl";

export default function NotificationsPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <div className="bg-card border rounded-lg p-8 text-center text-muted-foreground">
                Notifications list and preferences.
            </div>
        </div>
    );
}
