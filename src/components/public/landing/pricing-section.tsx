"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FEE_RATE = 0.015;
const MIN_VOL = 10_000;
const MAX_VOL = 10_000_000;

function logVolume(slider: number) {
    return Math.round(MIN_VOL * Math.pow(MAX_VOL / MIN_VOL, slider / 100) / 1000) * 1000;
}

function formatFCFA(val: number) {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(val) + ' FCFA';
}

export function PricingSection() {
    const t = useTranslations('Landing.Pricing');
    const [slider, setSlider] = useState(30);

    const volume = logVolume(slider);
    const cost = volume * FEE_RATE;

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-background" id="pricing">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

            <div className="container mx-auto relative z-10">

                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-5">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Pricing card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg mx-auto"
                >
                    <div className="bg-card border border-border/60 rounded-3xl shadow-xl p-8 md:p-10">

                        {/* Plan badge */}
                        <div className="flex justify-center mb-7">
                            <div className="px-5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest">
                                {t('planName')}
                            </div>
                        </div>

                        {/* Slider section */}
                        <div className="mb-8">
                            <p className="text-center text-sm font-semibold text-muted-foreground mb-4">
                                {t('sliderLabel')}
                            </p>

                            {/* Dynamic volume */}
                            <p className="text-center text-2xl font-black text-foreground mb-5">
                                {formatFCFA(volume)}
                            </p>

                            {/* Slider */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={slider}
                                onChange={(e) => setSlider(Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #10b981 ${slider}%, hsl(var(--muted)) ${slider}%)`
                                }}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:w-5
                                    [&::-webkit-slider-thumb]:h-5
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:bg-emerald-500
                                    [&::-webkit-slider-thumb]:shadow-md
                                    [&::-webkit-slider-thumb]:cursor-pointer
                                    [&::-webkit-slider-thumb]:border-2
                                    [&::-webkit-slider-thumb]:border-white
                                    [&::-moz-range-thumb]:border-0
                                    [&::-moz-range-thumb]:w-5
                                    [&::-moz-range-thumb]:h-5
                                    [&::-moz-range-thumb]:rounded-full
                                    [&::-moz-range-thumb]:bg-emerald-500"
                            />

                            <div className="flex justify-between text-xs text-muted-foreground mt-2.5 font-medium">
                                <span>{t('minVolume')}</span>
                                <span>{t('maxVolume')}</span>
                            </div>
                        </div>

                        {/* Fee stats */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="text-center p-5 rounded-2xl bg-muted/40 border border-border/40">
                                <p className="text-3xl font-black text-foreground">1.5%</p>
                                <p className="text-sm font-semibold text-foreground mt-1">{t('feeLabel')}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{t('feeSubLabel')}</p>
                            </div>
                            <div className="text-center p-5 rounded-2xl bg-muted/40 border border-border/40">
                                <p className="text-3xl font-black text-foreground">0 FCFA</p>
                                <p className="text-sm font-semibold text-foreground mt-1">{t('maintenanceLabel')}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{t('maintenanceSubLabel')}</p>
                            </div>
                        </div>

                        {/* Computed cost */}
                        <div className="flex justify-between items-center py-4 border-t border-border/50 mb-6">
                            <span className="text-muted-foreground font-medium">{t('estimatedCost')}</span>
                            <span className="text-xl font-black text-emerald-500">{formatFCFA(cost)}</span>
                        </div>

                        {/* CTA */}
                        <Link href="/merchant/register" className="block">
                            <button className="w-full h-14 bg-foreground text-background rounded-2xl font-bold text-base hover:opacity-90 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer">
                                {t('ctaBtn')}
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
