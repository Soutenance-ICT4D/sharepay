"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CopyPlus, Search } from "lucide-react";
import { ApplicationData, AppCard } from "./app-card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AppsGridProps {
    applications: ApplicationData[];
    onSettingsClick: (id: string) => void;
    onDeleteSuccess?: () => void;
    isLoading?: boolean;
}

export function AppsGrid({ applications, onSettingsClick, onDeleteSuccess, isLoading = false }: AppsGridProps) {
    const t = useTranslations("Dashboard.Apps");
    const [searchQuery, setSearchQuery] = useState("");
    const [envFilter, setEnvFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"

    const filteredAndSortedApps = useMemo(() => {
        let result = [...applications];

        // 1. Search Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (app) => app.name.toLowerCase().includes(query) || app.description.toLowerCase().includes(query)
            );
        }

        // 2. Environment Filter
        if (envFilter !== "all") {
            result = result.filter((app) => app.status === envFilter);
        }

        // 3. Date Sort
        result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [applications, searchQuery, envFilter, sortOrder]);

    if (applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 lg:p-24 border-2 border-dashed rounded-xl border-border bg-muted/10">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <CopyPlus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t("EmptyState.title")}
                </h3>
                <p className="text-muted-foreground text-center max-w-sm">
                    {t("EmptyState.description")}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder={t("Filters.searchPlaceholder")}
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={envFilter} onValueChange={setEnvFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder={t("Filters.envAll")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("Filters.envAll")}</SelectItem>
                            <SelectItem value="PRODUCTION">{t("Filters.envLive")}</SelectItem>
                            <SelectItem value="SANDBOX">{t("Filters.envTest")}</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-full sm:w-[160px]">
                            <SelectValue placeholder={t("Filters.sortNewest")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">{t("Filters.sortNewest")}</SelectItem>
                            <SelectItem value="oldest">{t("Filters.sortOldest")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Grid */}
            {filteredAndSortedApps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border rounded-xl border-border bg-muted/5">
                    <p className="text-muted-foreground">{t("EmptyState.title")}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedApps.map((app) => (
                        <AppCard
                            key={app.id}
                            app={app}
                            onSettingsClick={onSettingsClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
