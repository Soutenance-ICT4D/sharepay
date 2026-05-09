import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

export type SupportTicketItem = {
    id: string;
    title: string;
    meta: string;
    badge: string;
    status: string;
    badgeClassName?: string;
    statusClassName?: string;
    icon: ReactNode;
    iconWrapClassName?: string;
};

export function SupportTicketFeed({
    title,
    viewAllLabel = "Voir tous",
    items,
    onViewAll,
}: {
    title: string;
    viewAllLabel?: string;
    items: SupportTicketItem[];
    onViewAll?: () => void;
}) {
    return (
        <div className="bg-card text-card-foreground rounded-xl border flex flex-col overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                {onViewAll && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-600 hover:bg-blue-500/10 font-bold"
                        onClick={onViewAll}
                    >
                        {viewAllLabel}
                    </Button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto max-h-[450px]">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <Ticket className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Aucun ticket en cours</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 p-4 border-b last:border-b-0 hover:bg-muted/40 transition-colors cursor-pointer"
                        >
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.iconWrapClassName ?? ""}`}>
                                {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{item.meta}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className={`text-sm font-bold ${item.badgeClassName ?? "text-foreground"}`}>{item.badge}</p>
                                <span className={`text-[9px] font-bold uppercase tracking-widest ${item.statusClassName ?? "text-muted-foreground"}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
