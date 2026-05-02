"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Search, ChevronDown, Mail, FileText, HelpCircle, CreditCard, ShieldCheck, Code2, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Category = "General" | "Payments" | "Security" | "Developer" | "Billing";

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
    General:   HelpCircle,
    Payments:  CreditCard,
    Security:  ShieldCheck,
    Developer: Code2,
    Billing:   Receipt,
};

const CATEGORIES: Category[] = ["General", "Payments", "Security", "Developer", "Billing"];

export function FAQContent() {
    const t = useTranslations("FAQ");
    const [activeTab, setActiveTab] = useState<Category>("General");
    const [openId, setOpenId] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const sections = useMemo(() =>
        CATEGORIES.map(cat => ({
            cat,
            title: t(`${cat}.title`),
            icon: CATEGORY_ICONS[cat],
            items: (["q1", "q2", "q3", "q4"] as const)
                .filter(k => {
                    try { return !!t(`${cat}.${k}`); } catch { return false; }
                })
                .map(k => ({
                    id: `${cat}-${k}`,
                    q: t(`${cat}.${k}` as any),
                    a: t(`${cat}.${k.replace("q", "a")}` as any),
                })),
        }))
    , [t]);

    const activeSection = sections.find(s => s.cat === activeTab)!;

    const filtered = useMemo(() => {
        if (!search.trim()) return activeSection.items;
        const q = search.toLowerCase();
        return activeSection.items.filter(
            item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        );
    }, [search, activeSection]);

    return (
        <div className="w-full flex-1 flex flex-col bg-background">

            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="pt-28 pb-12 px-4 bg-muted/30 border-b border-border">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                        {t("heroTitle")}
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg">
                        {t("heroSubtitle")}
                    </p>
                    <div className="relative max-w-xl mx-auto mt-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground shadow-sm"
                            placeholder={t("searchPlaceholder")}
                            type="text"
                        />
                    </div>
                </div>
            </section>

            {/* ── Category tabs ─────────────────────────────────── */}
            <div className="sticky top-16 z-40 bg-background border-b border-border">
                <div className="max-w-4xl mx-auto px-4 overflow-x-auto">
                    <div className="flex gap-1 whitespace-nowrap">
                        {CATEGORIES.map(cat => {
                            const Icon = CATEGORY_ICONS[cat];
                            return (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveTab(cat); setSearch(""); setOpenId(null); }}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap focus:outline-none",
                                        activeTab === cat
                                            ? "border-primary text-primary"
                                            : "border-transparent text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    {t(`cat_${cat}` as any)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Questions ─────────────────────────────────────── */}
            <main className="flex-1 px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        {(() => { const Icon = activeSection.icon; return <Icon className="h-5 w-5 text-primary" />; })()}
                        {activeSection.title}
                    </h2>

                    {filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map(item => {
                                const isOpen = openId === item.id;
                                return (
                                    <div
                                        key={item.id}
                                        className="border border-border rounded-xl overflow-hidden bg-card transition-all hover:border-primary/30"
                                    >
                                        <button
                                            onClick={() => setOpenId(isOpen ? null : item.id)}
                                            className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/40 transition-colors focus:outline-none group"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="font-semibold text-sm sm:text-base pr-4">{item.q}</span>
                                            <ChevronDown className={cn(
                                                "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:text-primary",
                                                isOpen && "rotate-180 text-primary"
                                            )} />
                                        </button>
                                        <div className={cn(
                                            "grid transition-all duration-300 ease-in-out",
                                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        )}>
                                            <div className="overflow-hidden">
                                                <p className="px-5 pb-5 pt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/50">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-muted-foreground">
                            <HelpCircle className="h-10 w-10 mx-auto mb-3 opacity-30" />
                            <p>{t("noResults")}</p>
                        </div>
                    )}
                </div>
            </main>

            {/* ── Help CTA ──────────────────────────────────────── */}
            <section className="px-4 py-16 bg-muted/20 border-t border-border">
                <div className="max-w-3xl mx-auto rounded-2xl bg-primary/10 dark:bg-primary/5 p-8 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-1">{t("helpTitle")}</h3>
                        <p className="text-sm text-muted-foreground">{t("helpDesc")}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <Button size="lg" className="gap-2 rounded-xl" asChild>
                            <Link href="/contact">
                                <Mail className="h-4 w-4" />
                                {t("contactBtn")}
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2 rounded-xl" asChild>
                            <Link href="/docs">
                                <FileText className="h-4 w-4" />
                                {t("docsBtn")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}
