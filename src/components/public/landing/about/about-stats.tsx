"use client";

import { useTranslations } from "next-intl";
import { Users, BarChart3, Clock, ShieldCheck } from "lucide-react";

export function AboutStats() {
    const t = useTranslations('Landing.About.Stats');

    const stats = [
        { id: 'users', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 'transactions', icon: BarChart3, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { id: 'availability', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { id: 'support', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
    ];

    return (
        <section className="py-20 -mt-12 relative z-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-all hover:border-primary/20 group">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="text-2xl md:text-3xl font-extrabold mb-1">{t(`${stat.id}.value`)}</div>
                            <div className="text-sm text-muted-foreground font-medium">{t(`${stat.id}.label`)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
