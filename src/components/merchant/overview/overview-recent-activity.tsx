import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OverviewActivityItem } from "@/lib/data/dashboard";
import { Activity } from "lucide-react";

export function OverviewRecentActivity({
    title,
    viewAllLabel,
    items,
    isLoading,
    onViewAll,
    onLoadMore,
}: {
    title?: string;
    viewAllLabel?: string;
    items: OverviewActivityItem[];
    isLoading?: boolean;
    onViewAll?: () => void;
    onLoadMore?: () => void;
}) {
    const t = useTranslations("Dashboard.Overview.recentActivity");
    return (
        <div className="bg-card text-card-foreground rounded-xl border flex flex-col overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{title ?? t("title")}</h3>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10 font-bold"
                    onClick={onViewAll}
                >
                    {viewAllLabel ?? t("viewAll")}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[450px]">
                {isLoading ? (
                    <div className="divide-y">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-4">
                                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3.5 w-36" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <div className="text-right space-y-2 shrink-0">
                                    <Skeleton className="h-3.5 w-20 ml-auto" />
                                    <Skeleton className="h-2.5 w-12 ml-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <Activity className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">{t("emptyTitle")}</p>
                        <p className="text-xs text-muted-foreground">{t("emptyDescription")}</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="w-full text-left p-4 border-b last:border-b-0 hover:bg-muted/40 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.iconWrapClassName}`}>
                                    {item.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                                    <p className="text-[11px] text-muted-foreground truncate">{item.meta}</p>
                                    {item.payerAccount && (
                                        <span className="inline-block mt-0.5 text-[10px] font-mono tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                            {item.payerAccount}
                                        </span>
                                    )}
                                </div>

                                <div className="text-right shrink-0">
                                    <p className={`text-sm font-bold ${item.amountClassName ?? "text-foreground"}`}>
                                        {item.amount}
                                    </p>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${item.statusClassName ?? "text-muted-foreground"}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>

            {items.length > 0 && (
                <div className="p-4 bg-muted/30 text-center">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground font-bold"
                        onClick={onLoadMore}
                    >
                        {t("loadMore")}
                    </Button>
                </div>
            )}
        </div>
    );
}
