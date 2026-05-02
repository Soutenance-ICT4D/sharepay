"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function FeaturesHero() {
    const t = useTranslations('Landing.Features.Hero');

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background elements for premium look */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    {t('badge')}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {t('title')}
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    {t('subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold" asChild>
                        <Link href="/merchant/register">{t('ctaStart')}</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all" asChild>
                        <Link href="/docs">{t('ctaDocs')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
