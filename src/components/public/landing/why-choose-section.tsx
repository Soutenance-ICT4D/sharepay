"use client";

import { useTranslations } from "next-intl";
import { Zap, ShieldCheck, HeartHandshake, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export function WhyChooseSection() {
    const t = useTranslations('Landing.WhyChoose');

    const features = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: t('feature1.title'),
            description: t('feature1.description'),
            iconColor: "text-amber-500",
            iconBg: "bg-amber-500/10 border-amber-500/20",
            accent: "group-hover:border-amber-500/30",
        },
        {
            icon: <Rocket className="h-6 w-6" />,
            title: t('feature2.title'),
            description: t('feature2.description'),
            iconColor: "text-blue-500",
            iconBg: "bg-blue-500/10 border-blue-500/20",
            accent: "group-hover:border-blue-500/30",
        },
        {
            icon: <ShieldCheck className="h-6 w-6" />,
            title: t('feature3.title'),
            description: t('feature3.description'),
            iconColor: "text-emerald-500",
            iconBg: "bg-emerald-500/10 border-emerald-500/20",
            accent: "group-hover:border-emerald-500/30",
        },
        {
            icon: <HeartHandshake className="h-6 w-6" />,
            title: t('feature4.title'),
            description: t('feature4.description'),
            iconColor: "text-primary",
            iconBg: "bg-primary/10 border-primary/20",
            accent: "group-hover:border-primary/30",
        },
    ];

    return (
        <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

            <div className="container mx-auto relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-5">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group bg-card border border-border/50 ${feature.accent} rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.iconBg} border ${feature.iconColor} flex items-center justify-center mb-6`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-3 tracking-tight text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
