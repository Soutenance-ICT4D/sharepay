"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/core/i18n/routing";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { HeroBackground } from "@/components/public/landing/animations/hero-background";
import { DemoModal } from "@/components/public/landing/animations/demo-modal";
import Image from "next/image";

export function HeroSection() {
    const t = useTranslations('Landing.Hero');

    return (
        <section className="relative flex flex-col pt-32 md:pt-40 overflow-hidden">

            {/* Background Animation */}
            <HeroBackground />

            {/* Contenu principal */}
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mb-12 md:mb-16">

                {/* Title */}
                <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-foreground mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    {t('title')}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-medium text-pretty">
                    {t('subtitle')}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center w-full px-4 sm:px-0">
                    <Button
                        size="lg"
                        className="rounded-full h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 font-bold bg-primary text-primary-foreground border-0 w-full sm:w-auto group relative overflow-hidden"
                        asChild
                    >
                        <Link href="/register">
                            <span className="relative z-10 flex items-center justify-center">
                                {t('ctaStart')}
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Link>
                    </Button>

                    <DemoModal>
                        <Button
                            size="lg"
                            variant="outline"
                            suppressHydrationWarning
                            className="rounded-full h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto cursor-pointer backdrop-blur-sm font-semibold group"
                        >
                            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current group-hover:scale-110 transition-transform" />
                            {t('ctaDemo')}
                        </Button>
                    </DemoModal>
                </div>

                {/* Reassurance */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground/70">
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>{t('reassurance')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}