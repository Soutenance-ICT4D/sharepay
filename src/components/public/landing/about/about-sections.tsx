"use client";

import { useTranslations } from "next-intl";
import { Lightbulb, ShieldCheck, Heart } from "lucide-react";

export function AboutSections() {
    const t = useTranslations('Landing.About');

    const values = [
        { id: 'v1', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { id: 'v2', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 'v3', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    ];

    return (
        <div className="bg-background">
            {/* Story Section */}
            <section className="py-24 border-t border-border/40">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t('Story.title')}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('Story.content')}
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                                <span className="text-primary font-bold text-lg">SharePay Story Illustration</span>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">{t('Values.title')}</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((val) => (
                            <div key={val.id} className="bg-card p-8 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-all hover:shadow-xl group">
                                <div className={`w-14 h-14 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                                    <val.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{t(`Values.${val.id}.title`)}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t(`Values.${val.id}.desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
