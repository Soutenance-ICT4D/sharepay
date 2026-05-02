"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function PaymentMethodSection() {
    const t = useTranslations('Landing.PaymentMethod');

    const methods = [
        {
            name: t('mtnName'),
            description: t('mtnDesc'),
            users: t('mtnUsers'),
            logo: "/images/partners/logo_momo.png",
            headerGradient: "from-[#FFCC00] to-[#FFB900]",
            borderColor: "border-[#FFCC00]/30",
            hoverBorder: "hover:border-[#FFCC00]/60",
            hoverShadow: "hover:shadow-[#FFCC00]/10",
        },
        {
            name: t('orangeName'),
            description: t('orangeDesc'),
            users: t('orangeUsers'),
            logo: "/images/partners/logo_orange_money.png",
            headerGradient: "from-[#FF7900] to-[#E66D00]",
            borderColor: "border-[#FF7900]/30",
            hoverBorder: "hover:border-[#FF7900]/60",
            hoverShadow: "hover:shadow-[#FF7900]/10",
        },
    ];

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-muted/30">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

            <div className="container mx-auto relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-balance">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Partner cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {methods.map((method, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className={`group bg-card border ${method.borderColor} ${method.hoverBorder} rounded-3xl overflow-hidden shadow-lg hover:shadow-xl ${method.hoverShadow} hover:-translate-y-1 transition-all duration-300`}
                        >
                            {/* Brand color accent bar */}
                            <div className={`h-1.5 bg-gradient-to-r ${method.headerGradient}`} />

                            {/* Card body */}
                            <div className="p-8 flex flex-col items-center text-center">
                                <div className="relative w-24 h-24 mb-6">
                                    <Image
                                        src={method.logo}
                                        alt={method.name}
                                        fill
                                        className="object-contain drop-shadow-md"
                                    />
                                </div>

                                <div className="flex items-center gap-2.5 mb-3 flex-wrap justify-center">
                                    <h3 className="text-xl font-extrabold text-foreground">{method.name}</h3>
                                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                        <span className="text-[11px] font-bold text-emerald-500">{t('availableNow')}</span>
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{method.description}</p>

                                <div className="px-4 py-2 rounded-full bg-muted/60 border border-border/50">
                                    <span className="text-sm font-bold text-foreground">{method.users}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Coming soon note */}
                <p className="text-center text-sm text-muted-foreground mt-8 font-medium">
                    {t('comingSoon')}
                </p>
            </div>
        </section>
    );
}
