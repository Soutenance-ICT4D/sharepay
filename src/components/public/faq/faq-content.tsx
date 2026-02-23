"use client";

import { useState } from "react";
import { Search, Info, ShieldCheck, ChevronDown, Mail, FileText } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { Button } from "@/components/ui/button";

export function FAQContent() {
    const [activeTab, setActiveTab] = useState("General");
    const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

    const toggleQuestion = (id: string) => {
        setOpenQuestions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const categories = ["General", "Payments", "Security", "Developer API", "Billing"];

    const faqData = [
        {
            category: "General",
            icon: Info,
            title: "General Questions",
            questions: [
                {
                    id: "gen-1",
                    q: "How do I set up my SharePay account?",
                    a: "Setting up your SharePay account is simple. Sign up using your business email, complete the identity verification (KYC), and link your settlement bank account. Once verified, you can start accepting payments immediately using our hosted checkout pages."
                },
                {
                    id: "gen-2",
                    q: "What payment methods are supported?",
                    a: "We support major credit cards (Visa, Mastercard, AMEX), digital wallets (Apple Pay, Google Pay), and local bank transfer methods across 50+ countries."
                },
                {
                    id: "gen-3",
                    q: "Is there a limit on transaction volume?",
                    a: "Standard accounts have dynamic limits based on verification level. Enterprise customers can enjoy unlimited transaction volume after a brief review process."
                }
            ]
        },
        {
            category: "Security",
            icon: ShieldCheck,
            title: "Security & Compliance",
            questions: [
                {
                    id: "sec-1",
                    q: "How secure is the SharePay platform?",
                    a: "SharePay is PCI-DSS Level 1 compliant, the highest standard in the industry. We use AES-256 encryption and multi-factor authentication for all account access."
                },
                {
                    id: "sec-2",
                    q: "Does SharePay offer fraud protection?",
                    a: "Yes, every transaction is analyzed by our AI-driven fraud detection engine which uses 300+ signals to block suspicious attempts in real-time."
                }
            ]
        }
    ];

    const visibleFaqs = activeTab === "General" ? faqData : faqData.filter(section => section.category === activeTab);

    return (
        <div className="w-full flex-1 flex flex-col bg-background">
            {/* Hero Search Section */}
            <section className="px-6 lg:px-40 pt-32 pb-16 bg-muted/30 border-b border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">How can we help?</h1>
                    <p className="text-lg text-muted-foreground mb-8">Search our knowledge base for answers to your payment processing questions.</p>
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            className="block w-full pl-12 pr-4 py-4 bg-background border border-input rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground shadow-sm font-medium"
                            placeholder="Search help articles, guides, and more..."
                            type="text"
                        />
                    </div>
                </div>
            </section>

            {/* Categories Tabs */}
            <div className="px-6 lg:px-40 bg-background border-b border-border sticky top-[73px] z-40">
                <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
                    <div className="flex gap-8 whitespace-nowrap">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={cn(
                                    "flex flex-col items-center justify-center border-b-2 pb-4 pt-5 px-2 transition-colors focus:outline-none",
                                    activeTab === category
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-primary"
                                )}
                            >
                                <span className={cn(
                                    "text-sm tracking-wide",
                                    activeTab === category ? "font-bold" : "font-semibold"
                                )}>
                                    {category}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Content Area */}
            <main className="flex-1 px-6 lg:px-40 py-12 md:py-16">
                <div className="max-w-3xl mx-auto space-y-12">
                    {visibleFaqs.length > 0 ? (
                        visibleFaqs.map((section, idx) => (
                            <div key={idx} className="mb-12 last:mb-0 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${idx * 150}ms` }}>
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <section.icon className="h-6 w-6 text-primary" />
                                    {section.title}
                                </h2>

                                <div className="space-y-4">
                                    {section.questions.map((q) => {
                                        const isOpen = !!openQuestions[q.id];
                                        return (
                                            <div key={q.id} className="border border-border rounded-xl overflow-hidden bg-card/50 shadow-sm transition-all hover:border-primary/20">
                                                <button
                                                    onClick={() => toggleQuestion(q.id)}
                                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors group focus:outline-none"
                                                    aria-expanded={isOpen}
                                                >
                                                    <span className="font-semibold text-foreground text-base">{q.q}</span>
                                                    <ChevronDown className={cn(
                                                        "h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform duration-300 shrink-0 ml-4",
                                                        isOpen && "rotate-180 text-primary"
                                                    )} />
                                                </button>
                                                <div
                                                    className={cn(
                                                        "grid transition-all duration-300 ease-in-out",
                                                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                    )}
                                                >
                                                    <div className="overflow-hidden">
                                                        <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4 text-sm sm:text-base">
                                                            {q.a}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-muted-foreground animate-in fade-in">
                            No FAQ items found for the selected category.
                        </div>
                    )}
                </div>
            </main>

            {/* Help Section Footer */}
            <section className="px-6 lg:px-40 py-16 bg-muted/20 border-t border-border">
                <div className="max-w-4xl mx-auto rounded-2xl bg-primary/10 dark:bg-primary/5 p-8 lg:p-12 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2 text-foreground">Still need help?</h3>
                        <p className="text-muted-foreground">Can't find the answer you're looking for? Our support team is here for you 24/7.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <Button size="lg" className="w-full sm:w-auto gap-2 font-bold shadow-md hover:shadow-lg transition-all rounded-xl">
                            <Mail className="h-5 w-5" />
                            Contact Support
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 font-bold rounded-xl border-input hover:bg-muted/50 transition-all">
                            <FileText className="h-5 w-5" />
                            Documentation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
