"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/core/i18n/routing";
import Image from "next/image";
import { HandCoins } from "lucide-react";

export function OverviewPageHeading({
    title,
    subtitle,
    onPayout,
}: {
    title: string;
    subtitle: string;
    onPayout?: () => void;
}) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground font-medium mt-1">{subtitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button className="w-full sm:w-auto gap-2 font-bold shadow-lg shadow-primary/20" asChild>
                    <Link href="/dashboard/payment-links">
                        <Image
                            src="/icons/income.png"
                            alt="Payment Link"
                            width={16}
                            height={16}
                            className="h-4 w-4 opacity-90 brightness-0 invert"
                        />
                        <span>Lien de paiement</span>
                    </Link>
                </Button>

                <Button variant="outline" className="w-full sm:w-auto gap-2 px-6 font-bold" onClick={onPayout}>
                    <HandCoins className="h-4 w-4" />
                    <span>Payout</span>
                </Button>
            </div>
        </div>
    );
}
