"use client";

import { useState } from "react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { DeleteAppModal } from "./delete-app-modal";

export interface ApplicationData {
    id: string;
    name: string;
    description: string;
    logoUrl?: string | null;
    status: "PRODUCTION" | "SANDBOX";
    createdAt: string;
    transactionCount: number;
}

interface AppCardProps {
    app: ApplicationData;
    onSettingsClick: (id: string) => void;
    onDeleteSuccess?: () => void;
}

export function AppCard({ app, onSettingsClick, onDeleteSuccess }: AppCardProps) {
    const t = useTranslations("Dashboard.Apps.Card");
    const locale = useLocale();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const dateLocale = locale === 'fr' ? fr : enUS;

    // Default SharePay logo if no logo provided
    const defaultLogo = "/logo.svg"; // Adjust path if needed, usually in public/

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
                                {app.logoUrl ? (
                                    <img
                                        src={app.logoUrl}
                                        alt={app.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={defaultLogo}
                                        alt="SharePay"
                                        className="w-8 h-8 opacity-80"
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
                        <div className="flex items-center gap-2 shrink-0">
                            <Badge variant={app.status === "PRODUCTION" ? "default" : "secondary"}>
                                {app.status === "PRODUCTION" ? t("statusLive") : t("statusTest")}
                            </Badge>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">{t("actions")}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive cursor-pointer gap-2"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        {t("delete")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                        {app.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
            </Card>

            <DeleteAppModal
                appId={app.id}
                appName={app.name}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={() => onDeleteSuccess?.()}
            />
        </>
    );
}
