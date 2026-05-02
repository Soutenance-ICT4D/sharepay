"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export interface Application {
    id: string;
    name: string;
}

interface TransactionsAppSelectorProps {
    applications: Application[];
    selectedAppId: string | null;
    onSelectApp: (appId: string | null) => void;
}

export function TransactionsAppSelector({
    applications,
    selectedAppId,
    onSelectApp,
}: TransactionsAppSelectorProps) {
    const t = useTranslations("Dashboard.Transactions");

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            <Button
                variant={selectedAppId === null ? "default" : "outline"}
                onClick={() => onSelectApp(null)}
                className="rounded-full"
            >
                {t("allApps")}
            </Button>
            {applications.map((app) => (
                <Button
                    key={app.id}
                    variant={selectedAppId === app.id ? "default" : "outline"}
                    onClick={() => onSelectApp(app.id)}
                    className="rounded-full"
                >
                    {app.name}
                </Button>
            ))}
        </div>
    );
}
