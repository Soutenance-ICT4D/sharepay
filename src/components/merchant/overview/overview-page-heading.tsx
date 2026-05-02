import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function OverviewPageHeading({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    const t = useTranslations("Dashboard.Overview");

    return (
        <div className="flex flex-row items-center justify-between gap-2">
            <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground font-medium mt-1 truncate">{subtitle}</p>
            </div>

            <div className="flex gap-2 shrink-0">
                {/* Mobile: icône seule */}
                <Button
                    className="sm:hidden h-9 w-9 p-0 shadow-lg shadow-primary/20"
                    asChild
                >
                    <Link href="/merchant/funds-collection" aria-label={t("actions.paymentLink")}>
                        <Image
                            src="/icons/income.png"
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 opacity-90 brightness-0 invert"
                        />
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className="sm:hidden h-9 w-9 p-0"
                    asChild
                >
                    <Link href="/merchant/withdrawals" aria-label={t("actions.withdraw")}>
                        <Image
                            src="/icons/withdraw.png"
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 dark:invert"
                        />
                    </Link>
                </Button>

                {/* Tablette / Desktop : icône + texte */}
                <Button
                    className="hidden sm:inline-flex gap-2 font-bold shadow-lg shadow-primary/20"
                    asChild
                >
                    <Link href="/merchant/funds-collection">
                        <Image
                            src="/icons/income.png"
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 opacity-90 brightness-0 invert"
                        />
                        {t("actions.paymentLink")}
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className="hidden sm:inline-flex gap-2 px-6 font-bold"
                    asChild
                >
                    <Link href="/merchant/withdrawals">
                        <Image
                            src="/icons/withdraw.png"
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 dark:invert"
                        />
                        {t("actions.withdraw")}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
