import { ReactNode } from "react";

export function AdminPageHeading({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
