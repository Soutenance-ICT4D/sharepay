"use client";

import { ChevronDown, Smartphone, Terminal, Code2 } from "lucide-react";
import { cn } from "@/core/lib/utils";

export type DocSection = "introduction" | "authentication" | "errors" | "charges" | "customers" | "refunds" | "subscriptions" | "webhooks-config" | "webhooks-events" | "sdk-js" | "sdk-mobile" | "sdk-backend";

interface DevelopersSidebarProps {
    activeSection: DocSection;
    onSelectSection: (section: DocSection) => void;
}

export function DevelopersSidebar({ activeSection, onSelectSection }: DevelopersSidebarProps) {
    const renderLink = (id: DocSection, label: string, icon?: React.ReactNode) => {
        const isActive = activeSection === id;
        return (
            <li>
                <button
                    onClick={() => onSelectSection(id)}
                    className={cn(
                        "w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium",
                        isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                >
                    {icon}
                    <span>{label}</span>
                </button>
            </li>
        );
    };

    return (
        <aside className="hidden lg:block w-72 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto border-r border-border p-6 shrink-0 z-10">
            <div className="space-y-8">
                <div>
                    <h5 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Getting Started</h5>
                    <ul className="space-y-2 text-sm">
                        {renderLink("introduction", "Introduction")}
                        {renderLink("authentication", "Authentication")}
                        {renderLink("errors", "Errors")}
                    </ul>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">API Reference</h5>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <ul className="space-y-2 text-sm">
                        {renderLink("charges", "Charges")}
                        {renderLink("customers", "Customers")}
                        {renderLink("refunds", "Refunds")}
                        {renderLink("subscriptions", "Subscriptions")}
                    </ul>
                </div>
                <div>
                    <h5 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Webhooks</h5>
                    <ul className="space-y-2 text-sm">
                        {renderLink("webhooks-config", "Configuration")}
                        {renderLink("webhooks-events", "Event Types")}
                    </ul>
                </div>
                <div>
                    <h5 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">SDKs</h5>
                    <ul className="space-y-2 text-sm">
                        {renderLink("sdk-js", "JavaScript", <Code2 className="h-5 w-5" />)}
                        {renderLink("sdk-mobile", "iOS & Android", <Smartphone className="h-5 w-5" />)}
                        {renderLink("sdk-backend", "Python & Node.js", <Terminal className="h-5 w-5" />)}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
