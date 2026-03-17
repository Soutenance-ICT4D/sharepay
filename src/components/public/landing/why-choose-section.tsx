"use client";

import { useTranslations } from "next-intl";
import { Zap, ShieldCheck, HeartHandshake, Rocket } from "lucide-react";

export function WhyChooseSection() {
    const t = useTranslations('Landing.WhyChoose');

    const features = [
        {
            icon: <Zap className="h-7 w-7" />,
            title: t('feature1.title'),
            description: t('feature1.description'),
            iconColor: "text-amber-500",
            bgColor: "bg-amber-500/10",
        },
        {
            icon: <Rocket className="h-7 w-7" />,
            title: t('feature2.title'),
            description: t('feature2.description'),
            iconColor: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            icon: <ShieldCheck className="h-7 w-7" />,
            title: t('feature3.title'),
            description: t('feature3.description'),
            iconColor: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
        },
        {
            icon: <HeartHandshake className="h-7 w-7" />,
            title: t('feature4.title'),
            description: t('feature4.description'),
            iconColor: "text-primary",
            bgColor: "bg-primary/10",
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-muted/20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                        {t('title')}
                    </h2>
                    
                    <p className="text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative">
                            <div className={`p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border/50 transition-colors duration-300 h-full shadow-sm flex flex-col items-start`}>
                                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} ${feature.iconColor} flex items-center justify-center mb-8 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
