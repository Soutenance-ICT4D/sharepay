"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/core/i18n/routing";
import { Check } from "lucide-react";
import Image from "next/image";

export function FeatureDetail() {
    const t = useTranslations('Landing.Features.Details');

    return (
        <section className="py-24 space-y-32">
            {/* Unified API Section */}
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold mb-6">
                        {t('api.tag')}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        {t('api.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {t('api.description')}
                    </p>
                    <ul className="space-y-4">
                        {['feature1', 'feature2', 'feature3'].map((f) => (
                            <li key={f} className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                </div>
                                <span className="font-medium">{t(`api.${f}`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="order-1 lg:order-2 relative h-[300px] md:h-[450px] bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] border border-blue-500/10 flex items-center justify-center p-8 overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
                    <Code2Icon className="h-48 w-48 text-blue-500/20 group-hover:scale-110 transition-transform duration-700" />
                </div>
            </div>

            {/* Security Section */}
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative h-[300px] md:h-[450px] bg-gradient-to-bl from-green-500/20 to-emerald-500/20 rounded-[2.5rem] border border-green-500/10 flex items-center justify-center p-8 overflow-hidden group">
                     <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors duration-500" />
                    <ShieldCheckIcon className="h-48 w-48 text-green-500/20 group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold mb-6">
                        {t('security.tag')}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        {t('security.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {t('security.description')}
                    </p>
                    <ul className="space-y-4">
                        {['feature1', 'feature2', 'feature3'].map((f) => (
                            <li key={f} className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                </div>
                                <span className="font-medium">{t(`security.${f}`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export function FeaturesCTA() {
    const t = useTranslations('Landing.Features.CTA');

    return (
        <section className="py-24 container mx-auto px-6">
            <div className="relative bg-primary rounded-[3rem] p-12 md:p-20 text-center overflow-hidden group">
                {/* Decorative backgrounds */}
                <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-white/5 skew-x-[-15deg] group-hover:translate-x-4 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-black/5 blur-3xl animate-pulse" />

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-8">
                        {t('title')}
                    </h2>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-12">
                        {t('subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button size="lg" variant="secondary" className="rounded-full px-12 font-bold shadow-2xl transition-transform hover:scale-105" asChild>
                            <Link href="/register">{t('ctaStart')}</Link>
                        </Button>
                        <Button size="lg" variant="ghost" className="rounded-full px-12 font-bold border border-primary-foreground/20 text-primary-foreground hover:bg-white/10 transition-colors" asChild>
                            <Link href="/contact">{t('ctaContact')}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Simple icons placeholders
function Code2Icon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
    );
}

function ShieldCheckIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
        </svg>
    );
}
