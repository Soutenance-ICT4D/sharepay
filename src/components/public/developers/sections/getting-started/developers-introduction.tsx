"use client";

import { ChevronRight, Code2, Webhook, Package, ArrowRight, Info, CheckCircle2, Copy, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RightNavItem } from "../../developers-right-nav";

export const introductionNavItems: RightNavItem[] = [
    { id: "intro-overview", label: "Overview", isActive: true },
    { id: "intro-features", label: "Featured Services" },
    { id: "intro-quickstart", label: "Quick Start Guide" },
    { id: "intro-payment-methods", label: "Payment Methods" }
];

interface DevelopersIntroductionProps {
    onNavigate?: (id: string) => void;
}

export function DevelopersIntroduction({ onNavigate }: DevelopersIntroductionProps) {
    const t = useTranslations("Developers.Intro");

    return (
        <div className="max-w-[70rem] mx-auto pb-16">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 scroll-m-24" id="intro-overview">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    {t("title")}
                </h1>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shrink-0 shadow-sm">
                    <Download className="h-4 w-4" />
                    <span>{t("downloadDocs")}</span>
                </button>
            </div>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {t("description")}
            </p>

            {/* Featured Sections */}
            <div id="intro-features" className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-16 scroll-m-24">
                <div
                    onClick={() => onNavigate?.("health")}
                    className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm hover:shadow-md cursor-pointer"
                >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0 transition-transform group-hover:scale-105">
                        <Code2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{t("restApiTitle")}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t("restApiDesc")}</p>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                        {t("exploreApi")} <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
                <div
                    onClick={() => onNavigate?.("webhooks-config")}
                    className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm hover:shadow-md cursor-pointer"
                >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0 transition-transform group-hover:scale-105">
                        <Webhook className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{t("webhooksTitle")}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t("webhooksDesc")}</p>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                        {t("setupHooks")} <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
                <div
                    onClick={() => onNavigate?.("sdk-js")}
                    className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm hover:shadow-md cursor-pointer"
                >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0 transition-transform group-hover:scale-105">
                        <Package className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{t("sdksTitle")}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t("sdksDesc")}</p>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                        {t("viewSdks")} <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>

            <div className="space-y-16">
                <section id="intro-quickstart" className="scroll-m-24">
                    <h2 className="text-2xl font-bold mb-4">{t("quickstartTitle")}</h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            {t("quickstartDesc")}
                        </p>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border-l-4 border-primary shadow-sm mb-6">
                            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground leading-relaxed">
                                {t("apiVersion")} <code className="bg-background px-1.5 py-0.5 rounded text-xs border border-border shadow-sm text-muted-foreground font-mono">2023-10-27</code>.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="intro-payment-methods" className="scroll-m-24">
                    <h2 className="text-2xl font-bold mb-4">{t("paymentMethodsTitle")}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        {t("paymentMethodsDesc")}
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-16 mt-4">
                        {/* MTN MoMo */}
                        <div className="relative h-24 w-48 group">
                            <Image
                                src="/images/partners/mtn.png"
                                alt="MTN Mobile Money"
                                fill
                                className="object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
                            />
                        </div>
                        {/* Orange Money */}
                        <div className="relative h-24 w-48 group">
                            <Image
                                src="/images/partners/orange.png"
                                alt="Orange Money"
                                fill
                                className="object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
