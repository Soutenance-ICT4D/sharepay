"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export interface DocNavigationItem {
    id: string;
    title: string;
    section: string;
}

interface DocPaginationProps {
    prev?: DocNavigationItem;
    next?: DocNavigationItem;
    onNavigate: (id: string) => void;
}

export function DocPagination({ prev, next, onNavigate }: DocPaginationProps) {
    const t = useTranslations("Developers.Pagination");

    if (!prev && !next) return null;

    return (
        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 pb-12">
            {prev ? (
                <button
                    onClick={() => onNavigate(prev.id)}
                    className="group relative flex flex-1 w-full sm:w-[48%] flex-col items-start gap-1 rounded-2xl border border-border bg-transparent p-6 text-left transition-all hover:border-primary/30 hover:bg-muted/30 hover:shadow-md dark:hover:bg-muted/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {t("previous")}
                    </span>
                    <div className="relative z-10 mt-2 flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">{prev.title}</span>
                        <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary/80 hidden sm:inline-block">• {prev.section}</span>
                    </div>
                </button>
            ) : (
                <div className="flex-1 hidden sm:block"></div>
            )}

            {next ? (
                <button
                    onClick={() => onNavigate(next.id)}
                    className="group relative flex flex-1 w-full sm:w-[48%] flex-col items-end gap-1 rounded-2xl border border-border bg-transparent p-6 text-right transition-all hover:border-primary/30 hover:bg-muted/30 hover:shadow-md dark:hover:bg-muted/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                        {t("next")}
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="relative z-10 mt-2 flex items-center justify-end gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary/80 hidden sm:inline-block">{next.section} •</span>
                        <span className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">{next.title}</span>
                    </div>
                </button>
            ) : (
                <div className="flex-1 hidden sm:block"></div>
            )}
        </div>
    );
}
