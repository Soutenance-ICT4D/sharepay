"use client";

import { useTranslations } from "next-intl";
import { 
    Code2, 
    ShieldCheck, 
    BarChart3, 
    Wallet, 
    CheckCircle2, 
    Smartphone 
} from "lucide-react";

export function FeaturesGrid() {
    const t = useTranslations('Landing.Features.Grid');
    const tb = useTranslations('Landing.Features.Main');

    const features = [
        { key: 'api', icon: Code2, color: 'text-blue-500' },
        { key: 'security', icon: ShieldCheck, color: 'text-green-500' },
        { key: 'analytics', icon: BarChart3, color: 'text-purple-500' },
        { key: 'payout', icon: Wallet, color: 'text-orange-500' },
        { key: 'checkout', icon: CheckCircle2, color: 'text-indigo-500' },
        { key: 'developer', icon: Smartphone, color: 'text-pink-500' },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">{tb('title')}</h2>
                <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
                    {tb('subtitle')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div 
                            key={feature.key} 
                            className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 text-left"
                        >
                            <div className={`p-3 rounded-2xl bg-muted/50 w-fit mb-6 group-hover:bg-primary/5 transition-colors`}>
                                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {t(`${feature.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t(`${feature.key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
