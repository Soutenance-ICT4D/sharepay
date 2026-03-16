"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export function PaymentMethodSection() {
    const t = useTranslations('Landing.PaymentMethod');

    const methods = [
        {
            name: t('mtnName'),
            description: t('mtnDesc'),
            logo: "/images/partners/mtn.png",
            color: "bg-gradient-to-br from-[#FFCC00] to-[#FFB900]",
            textColor: "text-black",
            borderColor: "border-[#FFCC00]/20",
            hoverBorder: "hover:border-[#FFCC00]/80",
            glowColor: "shadow-[0_20px_50px_rgba(255,204,0,0.1)]",
            hoverGlow: "hover:shadow-[0_20px_50px_rgba(255,204,0,0.3)]"
        },
        {
            name: t('orangeName'),
            description: t('orangeDesc'),
            logo: "/images/partners/Orange_white.png",
            color: "bg-gradient-to-br from-[#FF7900] to-[#E66D00]",
            textColor: "text-white",
            borderColor: "border-[#FF7900]/20",
            hoverBorder: "hover:border-[#FF7900]/80",
            glowColor: "shadow-[0_20px_50px_rgba(255,121,0,0.1)]",
            hoverGlow: "hover:shadow-[0_20px_50px_rgba(255,121,0,0.3)]"
        }
    ];

    const smoothEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 relative z-10">
                
                {/* En-tête de section */}
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
                        className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-balance"
                    >
                        {t('title')}
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                        className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                {/* Cartes de paiement */}
                <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto h-full">
                    {methods.map((method, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.15), ease: smoothEase }}
                            className="w-full lg:flex-1 group relative"
                        >
                            <div className={`
                                relative overflow-hidden
                                p-8 md:p-10 rounded-[2.5rem]
                                bg-card/30 backdrop-blur-xl
                                border border-border/40 ${method.hoverBorder}
                                transition-all duration-700 ease-out
                                ${method.glowColor} ${method.hoverGlow}
                                hover:-translate-y-3 cursor-default flex flex-col items-center text-center
                            `}>
                                
                                {/* Logo XL */}
                                <div className={`
                                    w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-10
                                    transition-all duration-700 ease-out 
                                    group-hover:scale-110 group-hover:rotate-3
                                    filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]
                                `}>
                                    <div className="relative w-full h-full">
                                        <Image 
                                            src={method.logo} 
                                            alt={method.name} 
                                            fill 
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                
                                {/* Info Text */}
                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                                        {method.name}
                                    </h3>
                                    <p className="text-sm md:text-base font-medium text-muted-foreground/80 leading-relaxed px-4">
                                        {method.description}
                                    </p>
                                </div>

                                {/* Background Decorative element */}
                                <div className={`absolute top-0 right-0 w-32 h-32 ${method.color} opacity-[0.03] blur-3xl -mr-10 -mt-10 rounded-full`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none -z-10" />
        </section>
    );
}