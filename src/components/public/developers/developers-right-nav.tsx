"use client";

import { MessageSquare, Bug } from "lucide-react";
import { useTranslations } from "next-intl";

export interface RightNavItem {
    id: string;
    label: string;
    isActive?: boolean;
}

interface DevelopersRightNavProps {
    items: RightNavItem[];
    onItemClick: (id: string) => void;
}

export function DevelopersRightNav({ items, onItemClick }: DevelopersRightNavProps) {
    const t = useTranslations("Developers");

    return (
        <aside className="hidden xl:block w-64 h-full overflow-y-auto p-8 shrink-0 custom-scrollbar relative z-10 bg-background">
            <h5 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("OnThisPage")}</h5>

            <ul className="space-y-3 text-sm border-l border-border">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => onItemClick(item.id)}
                            className={`block -ml-px pl-4 border-l-2 text-left w-full transition-colors ${item.isActive
                                ? "border-primary text-primary font-medium"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-12 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">{t("HelpfulLinksTitle")}</p>
                <div className="space-y-4">
                    <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        <span>{t("CommunityForum")}</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Bug className="h-4 w-4 shrink-0" />
                        <span>{t("ReportIssue")}</span>
                    </a>
                </div>
            </div>
        </aside>
    );
}
