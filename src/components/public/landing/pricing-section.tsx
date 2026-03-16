"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function PricingSection() {
    const t = useTranslations('Landing.Pricing');
    const [sliderValue, setSliderValue] = useState(50); // 0-100 scale

    const smoothEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

    // Simulate pricing calculation
    // This is just a visual representation
    const volume = sliderValue * 100000 + 100000;
    const percentage = 1.5; // SharedPay fee
    const cost = volume * (percentage / 100);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat(t('badge') === 'Tarifs' ? 'fr-CM' : 'en-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-background" id="pricing">
             {/* Background elements */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
             
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
                        className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6"
                    >
                        {t('title')}
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                        className="text-lg text-muted-foreground"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto bg-card border rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">

                        {/* Visual Calculator Side */}
                        <div className="p-8 lg:p-12 bg-muted/20">
                            <h3 className="font-semibold mb-6">{t('sliderLabel')}</h3>

                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-3xl font-bold">{formatCurrency(volume)}</span>
                                    <span className="text-sm text-muted-foreground">{t('perMonth')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(Number(e.target.value))}
                                    className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                    <span>{t('start')}</span>
                                    <span>{t('highVol')}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-8 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">{t('platformFee')}</span>
                                    <span className="font-mono">1.5%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">{t('estimatedCost')}</span>
                                    <span className="text-xl font-bold text-primary">{formatCurrency(cost)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Features Side */}
                        <div className="p-8 lg:p-12 bg-primary text-primary-foreground flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-6">{t('everythingIncluded')}</h3>
                            <ul className="space-y-4">
                                {[
                                    t('featAccept'),
                                    t('featDashboard'),
                                    t('featFraud'),
                                    t('featSupport'),
                                    t('featPayout'),
                                    t('featCurrencies')
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
