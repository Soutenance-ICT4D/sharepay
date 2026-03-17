"use client";

import { useTranslations } from "next-intl";

export function PricingHero() {
    const t = useTranslations('Landing.Pricing');

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-background">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
            <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
            
            <div className="container mx-auto px-6 text-center">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {t('badge')}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    {t('title')}
                </h1>
                
                <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {t('subtitle')}
                </p>
            </div>
        </section>
    );
}
