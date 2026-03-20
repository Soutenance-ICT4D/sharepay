"use client";

import { useTranslations } from "next-intl";
import { UserPlus, Code2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorksSection() {
    const t = useTranslations('Landing.HowItWorks');

    const steps = [
        {
            icon: <UserPlus className="h-8 w-8" />,
            title: t('step1.title'),
            description: t('step1.description'),
            color: "bg-blue-500/10 text-blue-500",
            border: "border-blue-500/20"
        },
        {
            icon: <Code2 className="h-8 w-8" />,
            title: t('step2.title'),
            description: t('step2.description'),
            color: "bg-primary/10 text-primary",
            border: "border-primary/20"
        },
        {
            icon: <Rocket className="h-8 w-8" />,
            title: t('step3.title'),
            description: t('step3.description'),
            color: "bg-emerald-500/10 text-emerald-500",
            border: "border-emerald-500/20"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting lines for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-border/50 -translate-y-12 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -8 }}
                            className="flex flex-col items-center text-center p-8 rounded-3xl border border-border/20 bg-card/40 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className={`p-5 rounded-2xl ${step.color} border ${step.border} mb-6 shadow-lg`}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                            
                            {/* Step number badge */}
                            <div className="mt-8 h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                                {index + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
