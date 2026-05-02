"use client";

import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function PricingPlans() {
    const t = useTranslations('Landing.Pricing.Plans');

    const plans = [
        { id: 'Standard', popular: false },
        { id: 'Business', popular: true },
        { id: 'Enterprise', popular: false },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <div 
                            key={plan.id}
                            className={`relative p-8 rounded-[2.5rem] border transition-all duration-300 hover:shadow-2xl flex flex-col ${
                                plan.popular 
                                    ? 'bg-primary text-primary-foreground border-primary shadow-primary/20 scale-105 z-10' 
                                    : 'bg-card border-border hover:border-primary/50'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-primary text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                                    Plus Populaire
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-primary-foreground' : 'text-foreground'}`}>
                                    {t(`${plan.id}.name`)}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-extrabold">{t(`${plan.id}.price`)}</span>
                                    <span className={`text-sm ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>/ transaction</span>
                                </div>
                                <p className={`text-sm ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                                    {t(`${plan.id}.desc`)}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10 flex-1">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`h-5 w-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/20' : 'bg-primary/10'}`}>
                                            <Check className={`h-3 w-3 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                                        </div>
                                        <span className="text-sm font-medium">{t(`${plan.id}.features.${i}`)}</span>
                                    </div>
                                ))}
                            </div>

                            <Button 
                                asChild
                                variant={plan.popular ? 'secondary' : 'default'} 
                                className={`w-full h-12 rounded-2xl font-bold transition-all ${
                                    plan.popular 
                                        ? 'bg-white text-primary hover:bg-white/90 shadow-xl' 
                                        : 'shadow-lg shadow-primary/10'
                                }`}
                            >
                                <Link href="/merchant/register">
                                    Commencer
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
