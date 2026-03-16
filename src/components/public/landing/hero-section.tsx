"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/core/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, SmartphoneNfc } from "lucide-react";
import { HeroBackground } from "@/components/public/landing/animations/hero-background";
import { DemoModal } from "@/components/public/landing/animations/demo-modal";
import Image from "next/image";

export function HeroSection() {
    const t = useTranslations('Landing.Hero');

    // Courbe d'animation fluide et premium
    const smoothEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

    return (
        // RETRAIT de min-h-screen, ajout d'un padding-top plus grand pour compenser (pt-32)
        <section className="relative flex flex-col pt-32 md:pt-40 overflow-hidden">

            {/* Background Animation */}
            <HeroBackground />

            {/* Contenu principal : RETRAIT de flex-1 et ajout d'une marge basse contrôlée (mb-16 md:mb-24) */}
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mb-16 md:mb-24">
                
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: smoothEase }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-5 sm:mb-8 leading-[1.15] sm:leading-[1.1] text-balance bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/70 mx-auto max-w-4xl"
                >
                    {t('title')}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.15, ease: smoothEase }}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-medium text-pretty"
                >
                    {t('subtitle')}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: smoothEase }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center w-full px-4 sm:px-0"
                >
                    <Button 
                        size="lg" 
                        className="rounded-full h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 font-bold bg-primary text-primary-foreground border-0 w-full sm:w-auto group relative overflow-hidden" 
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
                </motion.div>

                {/* Reassurance */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground/70"
                >
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>{t('reassurance')}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}