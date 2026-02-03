"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Lock, Server, FileKey } from "lucide-react";

export function SecuritySection() {
    const t = useTranslations('Landing.Security');

    return (
        <section className="py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* VAULT VISUAL */}
                <div className="relative max-w-sm mx-auto aspect-square flex items-center justify-center">

                    {/* Outer Ring Animation */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
                    />

                    {/* Middle Ring Animation (Counter-clockwise) */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-8 border border-primary/30 rounded-full"
                    />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />

                    {/* Central Vault Icon */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="relative z-10 w-40 h-40 bg-background rounded-3xl shadow-2xl border border-border flex items-center justify-center"
                    >
                        <Lock className="h-16 w-16 text-primary" />

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 bg-card border shadow-lg p-3 rounded-xl"
                        >
                            <Shield className="h-6 w-6 text-green-500" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-6 bg-card border shadow-lg p-3 rounded-xl"
                        >
                            <Server className="h-6 w-6 text-blue-500" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Security Badges Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                    {[
                        { label: "PCI-DSS Level 1", icon: Shield },
                        { label: "End-to-End Encryption", icon: FileKey },
                        { label: "99.99% Uptime", icon: Server },
                        { label: "Fraud Protection", icon: Lock },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                            <item.icon className="h-8 w-8 text-muted-foreground" />
                            <span className="font-semibold text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
