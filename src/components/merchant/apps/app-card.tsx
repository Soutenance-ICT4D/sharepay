"use client";

import { useTranslations, useLocale } from "next-intl";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ApplicationData {
    id: string;
    name: string;
    description: string;
    logoUrl?: string | null;
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    activeKeyEnvironment: "LIVE" | "TEST" | null;
    currency: string;
    createdAt: string;
}

interface AppCardProps {
    app: ApplicationData;
    onSettingsClick: (id: string) => void;
}

export function AppCard({ app, onSettingsClick }: AppCardProps) {
    const t = useTranslations("Dashboard.Apps.Card");
    const locale = useLocale();

    const dateLocale = locale === 'fr' ? fr : enUS;

    return (
        <>
            <Card
                className="group flex flex-col h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden relative"
                onClick={() => onSettingsClick(app.id)}
            >
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            {/* App Logo */}
                            <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                                {app.logoUrl && (
                                    <img
                                        src={app.logoUrl}
                                        alt={app.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold truncate pr-2" title={app.name}>
                                    {app.name}
                                </CardTitle>
                                <span className="text-xs text-muted-foreground italic">
                                    {t("createdAt")} {format(new Date(app.createdAt), "dd MMM yyyy", { locale: dateLocale })}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                            {app.status !== "ACTIVE" && (
                                <Badge variant="destructive" className="text-[10px]">
                                    {app.status}
                                </Badge>
                            )}
                            {app.activeKeyEnvironment && (
                                <Badge
                                    variant={app.activeKeyEnvironment === "LIVE" ? "default" : "secondary"}
                                    className={app.activeKeyEnvironment === "LIVE"
                                        ? "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30"
                                        : "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30"
                                    }
                                >
                                    {app.activeKeyEnvironment === "LIVE" ? t("statusLive") : t("statusTest")}
                                </Badge>
                            )}
                        </div>
                    </div>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                        {app.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
            </Card>
        </>
    );
}
