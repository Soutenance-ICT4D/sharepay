"use client";

import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Eye, Activity } from "lucide-react";
import { useLocale } from "next-intl";

export interface ApplicationData {
    id: string;
    name: string;
    description: string;
    status: "live" | "test";
    createdAt: string;
    transactionCount: number;
}

interface AppCardProps {
    app: ApplicationData;
    onSettingsClick: (id: string) => void;
    onViewClick: (id: string) => void;
}

export function AppCard({ app, onSettingsClick, onViewClick }: AppCardProps) {
    const t = useTranslations("Dashboard.Apps.Card");
    const locale = useLocale();

    const dateLocale = locale === 'fr' ? fr : enUS;

    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-bold truncate pr-4" title={app.name}>
                        {app.name}
                    </CardTitle>
                    <Badge variant={app.status === "live" ? "default" : "secondary"} className="shrink-0">
                        {app.status === "live" ? t("statusLive") : t("statusTest")}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2 text-sm">
                    {app.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            <span>
                                <span className="font-semibold text-foreground">{app.transactionCount}</span> {t("transactions")}
                            </span>
                        </div>
                        <span className="text-xs">
                            {t("createdAt")} {format(new Date(app.createdAt), "dd MMM yyyy", { locale: dateLocale })}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t bg-muted/20">
                <Button
                    variant="outline"
                    className="w-full sm:w-1/2"
                    onClick={() => onSettingsClick(app.id)}
                >
                    <Settings className="w-4 h-4 mr-2" />
                    {t("settings")}
                </Button>
                <Button
                    className="w-full sm:w-1/2"
                    onClick={() => onViewClick(app.id)}
                >
                    <Eye className="w-4 h-4 mr-2" />
                    {t("viewDetails")}
                </Button>
            </CardFooter>
        </Card>
    );
}
