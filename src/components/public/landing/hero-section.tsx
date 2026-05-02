"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
    ArrowRight, Play,
    TrendingUp, ShieldCheck, Zap, Lock, BadgeCheck,
} from "lucide-react";
import { HeroBackground } from "@/components/public/landing/animations/hero-background";
import { DemoModal } from "@/components/public/landing/animations/demo-modal";
import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

// Replace these with API endpoint values when available
const PLATFORM_STATS = {
    merchants: "200+",
    transactions: "1M+",
    methods: "15+",
};

const BARS = [45, 65, 50, 80, 60, 90, 72];

const TRANSACTIONS = [
    { initials: "KM", name: "Kouam Martin", amount: "+15 000", color: "bg-orange-400" },
    { initials: "FB", name: "Fotso Brice", amount: "+8 500", color: "bg-blue-400" },
    { initials: "NA", name: "Ngo Alice", amount: "+22 000", color: "bg-emerald-400" },
];

export function HeroSection() {
    const t = useTranslations('Landing.Hero');

    return (
        <section className="relative flex flex-col pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
            <HeroBackground />

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

                    {/* Left column */}
                    <div className="flex-1 flex flex-col items-start text-left">

                        {/* Badge */}
                        <motion.div
                            {...fadeUp(0)}
                            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        >
                            <BadgeCheck className="h-4 w-4 shrink-0" />
                            <span className="text-sm font-semibold">{t('badgeText')}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            {...fadeUp(0.1)}
                            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight mb-5 leading-[1.05] text-foreground whitespace-pre-line"
                        >
                            {t.rich('title', {
                                accent: (chunks) => (
                                    <span className="text-emerald-500">{chunks}</span>
                                )
                            })}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            {...fadeUp(0.2)}
                            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg font-medium text-pretty"
                        >
                            {t('subtitle')}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            {...fadeUp(0.3)}
                            className="flex flex-col sm:flex-row gap-3 items-start mb-8 w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                asChild
                                className="rounded-full h-12 sm:h-13 px-8 text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 font-bold w-full sm:w-auto group relative overflow-hidden"
                            >
                                <Link href="/merchant/register">
                                    <span className="relative z-10 flex items-center justify-center">
                                        {t('ctaStart')}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </Link>
                            </Button>

                            <DemoModal>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    suppressHydrationWarning
                                    className="rounded-full h-12 sm:h-13 px-8 text-base border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto font-semibold group cursor-pointer"
                                >
                                    <Play className="mr-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
                                    {t('ctaDemo')}
                                </Button>
                            </DemoModal>
                        </motion.div>

                        {/* Reassurance */}
                        <motion.div
                            {...fadeUp(0.4)}
                            className="flex flex-wrap items-center gap-x-5 gap-y-2"
                        >
                            {[
                                { Icon: Zap, label: t('reassurance1') },
                                { Icon: TrendingUp, label: t('reassurance2') },
                                { Icon: Lock, label: t('reassurance3') },
                                { Icon: ShieldCheck, label: t('reassurance4') },
                            ].map(({ Icon, label }) => (
                                <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Icon className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                    <span className="font-medium">{label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right column — glassmorphism dashboard card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" as const }}
                        className="lg:w-[420px] xl:w-[460px] shrink-0"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/15 to-primary/15 rounded-[44px] blur-2xl pointer-events-none" />

                            <div className="relative bg-card/80 backdrop-blur-xl rounded-[28px] border border-border/60 shadow-2xl overflow-hidden p-6">

                                {/* Card header */}
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-sm font-medium text-muted-foreground">{t('mockupRevenue')}</span>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-bold text-emerald-500">{t('mockupLive')}</span>
                                    </div>
                                </div>

                                {/* Balance */}
                                <div className="mb-5">
                                    <p className="text-3xl font-black text-foreground tracking-tight">5 240 000 XAF</p>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            <span className="text-sm font-semibold">+23.5%</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">vs last month</span>
                                    </div>
                                </div>

                                {/* Bar chart */}
                                <div className="flex items-end gap-1.5 h-14 mb-5">
                                    {BARS.map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: "easeOut" as const }}
                                            className={`flex-1 rounded-t-md ${i === 5 ? 'bg-emerald-500' : 'bg-primary/20'}`}
                                        />
                                    ))}
                                </div>

                                <div className="h-px bg-border/50 mb-4" />

                                {/* Transactions */}
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                                    {t('mockupTransactions')}
                                </p>
                                <div className="space-y-2">
                                    {TRANSACTIONS.map((tx) => (
                                        <div
                                            key={tx.name}
                                            className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div className={`h-8 w-8 rounded-full ${tx.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                                    {tx.initials}
                                                </div>
                                                <span className="text-sm font-medium text-foreground">{tx.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-emerald-500">{tx.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" as const }}
                    className="mt-14 md:mt-20 pt-8 border-t border-border/40 grid grid-cols-3 gap-6"
                >
                    {[
                        { value: PLATFORM_STATS.merchants, label: t('statMerchantsLabel') },
                        { value: PLATFORM_STATS.transactions, label: t('statTxLabel') },
                        { value: PLATFORM_STATS.methods, label: t('statMethodsLabel') },
                    ].map(({ value, label }, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-none">
                                {value}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground font-medium mt-2">
                                {label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
