"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Check } from "lucide-react";

export function PricingSection() {
    const t = useTranslations('Landing.Pricing');
    const [sliderValue, setSliderValue] = useState(50); // 0-100 scale

    // Simulate pricing calculation
    // This is just a visual representation
    const volume = sliderValue * 100000 + 100000;
    const percentage = 1.5; // SharedPay fee
    const cost = volume * (percentage / 100);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <section className="py-24" id="pricing">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-card border rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">

                        {/* Visual Calculator Side */}
                        <div className="p-8 lg:p-12 bg-muted/20">
                            <h3 className="font-semibold mb-6">{t('sliderLabel')}</h3>

                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-3xl font-bold">{formatCurrency(volume)}</span>
                                    <span className="text-sm text-muted-foreground">/ month</span>
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
                                    <span>Start</span>
                                    <span>High Vol.</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-8 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Platform Fee</span>
                                    <span className="font-mono">1.5%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Estimated Cost</span>
                                    <span className="text-xl font-bold text-primary">{formatCurrency(cost)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Features Side */}
                        <div className="p-8 lg:p-12 bg-primary text-primary-foreground flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-6">Everything included</h3>
                            <ul className="space-y-4">
                                {[
                                    "Accept all payment methods",
                                    "Real-time dashboards",
                                    "Fraud detection included",
                                    "24/7 Developer support",
                                    "Automatic payouts",
                                    "Multiple currencies"
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
