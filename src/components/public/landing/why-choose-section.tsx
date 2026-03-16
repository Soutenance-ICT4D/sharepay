"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
            borderColor: "group-hover:border-amber-500/30"
        },
        {
            icon: <Rocket className="h-7 w-7" />,
            title: t('feature2.title'),
            description: t('feature2.description'),
            iconColor: "text-blue-500",
            bgColor: "bg-blue-500/10",
            borderColor: "group-hover:border-blue-500/30"
        },
        {
            icon: <ShieldCheck className="h-7 w-7" />,
            title: t('feature3.title'),
            description: t('feature3.description'),
            iconColor: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
            borderColor: "group-hover:border-emerald-500/30"
        },
        {
            icon: <HeartHandshake className="h-7 w-7" />,
            title: t('feature4.title'),
            description: t('feature4.description'),
            iconColor: "text-primary",
            bgColor: "bg-primary/10",
            borderColor: "group-hover:border-primary/30"
        }
    ];

    const smoothEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

    return (
        <section className="py-24 bg-muted/20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: smoothEase }}
                            className="group relative"
                        >
                            <div className={`p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/20 transition-all duration-500 h-full shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col items-start`}>
                                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} ${feature.iconColor} flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
