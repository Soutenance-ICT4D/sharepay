"use client";

import { useTranslations } from "next-intl";

export function AboutHero() {
    const t = useTranslations('Landing.About.Hero');

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-background">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent -z-10" />
            
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex flex-col items-center mb-8">
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
                            {t('badge')}
                        </span>
                        <div className="h-px w-12 bg-primary/30" />
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        {t('title')}
                    </h1>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>
            </div>
        </section>
    );
}
