export function SupportPageHeading({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
                {title}
            </h2>
            <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
        </div>
    );
}
