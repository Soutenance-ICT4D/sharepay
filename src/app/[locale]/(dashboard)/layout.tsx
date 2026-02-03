"use client";

import { useTranslations } from "next-intl";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = useTranslations('Dashboard');

    return (
        <div className="min-h-screen bg-muted/20">
            {/* Placeholder for Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 bg-background border-r sm:block">
                <div className="flex h-16 items-center px-6 font-bold text-lg border-b">
                    SharePay
                </div>
                <div className="p-4">
                    {/* Nav items will go here */}
                    <div className="text-sm text-muted-foreground">Navigation...</div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="sm:ml-64 min-h-screen flex flex-col">
                {/* Placeholder for Header */}
                <header className="h-16 border-b bg-background/50 backdrop-blur-xl flex items-center px-6 sticky top-0 z-10">
                    <div className="font-semibold">{t('title')}</div>
                </header>

                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
