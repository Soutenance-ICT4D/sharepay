interface PageHeadingProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export function PageHeading({ title, subtitle, actions }: PageHeadingProps) {
    return (
        <div className="flex flex-row items-center justify-between gap-2">
            <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-muted-foreground font-medium mt-1 truncate">{subtitle}</p>
                )}
            </div>
            {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
    );
}
