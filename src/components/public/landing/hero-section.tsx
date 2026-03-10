"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/core/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { HeroBackground } from "@/components/public/landing/animations/hero-background";
import { DemoModal } from "@/components/public/landing/animations/demo-modal";
import Image from "next/image";

export function HeroSection() {
    const t = useTranslations('Landing.Hero');

    return (
        <section className="relative min-h-screen flex flex-col items-center pt-24 lg:pt-32 overflow-hidden">

            {/* Background Animation */}
            <HeroBackground />

            <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-5xl py-12">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors border-primary/20 bg-primary/5 text-primary backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        v1.0 Public Beta
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 text-nowrap"
                >
                    {t('title')}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
                >
                    {t('subtitle')}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
                >
                    <Button size="lg" className="rounded-full text-base h-14 px-10 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-300 font-semibold w-full sm:w-auto" asChild>
                        <Link href="/register">
                            {t('ctaStart')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <DemoModal>
                        <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-10 border-2 hover:bg-muted/50 w-full sm:w-auto cursor-pointer">
                            <Play className="mr-2 h-4 w-4 fill-current" />
                            {t('ctaDemo')}
                        </Button>
                    </DemoModal>
                </motion.div>

                {/* Reassurance */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-10 mb-12 flex items-center gap-2 text-sm text-muted-foreground/80 font-medium"
                >
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{t('reassurance')}</span>
                </motion.div>
            </div>

            {/* Trust Strip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="w-full py-10 border-t border-white/5 bg-white/5 backdrop-blur-sm mt-auto"
            >
                <div className="container mx-auto px-4">
                    <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
                        {t('trustedBy')}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500">
                        {[
                            { name: "MTN", src: "/images/partners/mtn.png" },
                            { name: "Orange", src: "/images/partners/orange.png" },
                            { name: "Visa", src: "/images/partners/visa.svg" },
                            { name: "Mastercard", src: "/images/partners/mastercard.png" },
                            { name: "UBA", src: "/images/partners/uba.png" },
                            { name: "Ecobank", src: "/images/partners/ecobank.png" },
                        ].map((partner) => (
                            <div key={partner.name} className="relative h-8 w-24 relative hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={partner.src}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
