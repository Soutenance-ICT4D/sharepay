"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function PricingFAQ() {
    const t = useTranslations('Landing.Pricing.FAQ');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: t('q1'), a: t('a1') },
        { q: t('q2'), a: t('a2') },
        { q: t('q3'), a: t('a3') },
    ];

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        {t('title')}
                    </h2>
                </div>

                <div className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="bg-card border rounded-2xl px-6 transition-all shadow-sm"
                        >
                            <button 
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between text-left font-semibold py-6 hover:opacity-70 transition-opacity focus:outline-none"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
                                <p className="text-muted-foreground leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
