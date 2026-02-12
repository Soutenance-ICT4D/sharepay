"use client";

import { useTranslations } from "next-intl";
import { InfiniteLogos } from "@/components/public/landing/animations/orbit-animation";
import { Check } from "lucide-react";

export function ConnectivitySection() {
    const t = useTranslations('Landing.Connectivity');

    const partners = [
        { name: "Orange Money", logo: "/images/partners/orange.png" },
        { name: "MTN MoMo", logo: "/images/partners/mtn.png" },
        // New partners can be added here easily
        // { name: "Visa", logo: "/images/partners/visa.svg" },
    ];

    return (
        <section className="py-24 border-y border-border/50 overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">

                {/* Text Content */}
                <div className="max-w-3xl mb-16 h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{t('title')}</h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-auto">
                        {["Orange Money", "MTN Mobile Money", "Visa & Mastercard", "Wave (Coming soon)"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Check className="h-3 w-3" />
                                </div>
                                <span className="text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual: Orbit Animation (No Card, No Background) */}
                <div className="w-full max-w-4xl relative">
                    <InfiniteLogos partners={partners} />
                </div>

            </div>
        </section>
    );
}
