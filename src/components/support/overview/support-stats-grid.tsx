import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type SupportStat = {
    label: string;
    value: string;
    badge?: { label: string; className: string };
    icon: ReactNode;
    iconWrapClassName?: string;
    progress?: { value: number; className: string };
};

function ProgressBar({ value, className }: { value: number; className: string }) {
    const clamped = Math.max(0, Math.min(100, value));
    return (
        <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className={`h-full ${className}`} style={{ width: `${clamped}%` }} />
        </div>
    );
}

export function SupportStatsGrid({ stats, isLoading }: { stats: SupportStat[]; isLoading?: boolean }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-card text-card-foreground p-4 sm:p-6 rounded-xl border shadow-sm min-w-0">
                    <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-lg shrink-0 ${stat.iconWrapClassName ?? ""}`}>
                            {stat.icon}
                        </div>
                        {stat.badge && (
                            isLoading
                                ? <Skeleton className="h-5 w-16 rounded shrink-0 ml-2" />
                                : <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded shrink-0 ml-2 ${stat.badge.className}`}>
                                    {stat.badge.label}
                                  </span>
                        )}
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm font-medium truncate">{stat.label}</p>
                    <div className="min-w-0 mt-1">
                        {isLoading
                            ? <Skeleton className="h-8 w-36 rounded mt-1" />
                            : <span className="block text-lg sm:text-2xl lg:text-3xl font-extrabold text-foreground truncate">
                                {stat.value}
                              </span>
                        }
                    </div>
                    {stat.progress && !isLoading && (
                        <ProgressBar value={stat.progress.value} className={stat.progress.className} />
                    )}
                </div>
            ))}
        </div>
    );
}
