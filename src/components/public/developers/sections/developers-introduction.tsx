"use client";

import { ChevronRight, Code2, Webhook, Package, ArrowRight, Info, CheckCircle2, Copy } from "lucide-react";
import { RightNavItem } from "../developers-right-nav";

export const introductionNavItems: RightNavItem[] = [
    { id: "intro-overview", label: "Overview", isActive: true },
    { id: "intro-features", label: "Featured Services" },
    { id: "intro-quickstart", label: "Quick Start Guide" },
    { id: "intro-charge", label: "Creating Charges" }
];

export function DevelopersIntroduction() {
    return (
        <div className="max-w-[70rem] mx-auto pb-16">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <span className="hover:text-primary transition-colors cursor-pointer">Docs</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground font-medium">Getting Started</span>
            </nav>

            <h1 id="intro-overview" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 scroll-m-24">
                Developer Documentation
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Welcome to the SharePay platform. Our API and developer tools allow you to accept payments, manage subscriptions, and scale your global commerce infrastructure with security at the core. Get started in minutes with our robust SDKs and comprehensive REST API.
            </p>

            {/* Featured Sections */}
            <div id="intro-features" className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-16 scroll-m-24">
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm hover:shadow-md cursor-pointer">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0 transition-transform group-hover:scale-105">
                        <Code2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">REST API</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Full control over your payments with our granular REST endpoints.</p>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                        Explore API <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm hover:shadow-md cursor-pointer">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0 transition-transform group-hover:scale-105">
                        <Webhook className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Webhooks</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Real-time notifications for payment events and state changes.</p>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                        Setup Hooks <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm hover:shadow-md cursor-pointer">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0 transition-transform group-hover:scale-105">
                        <Package className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">SDK Libraries</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Official client libraries for JS, iOS, Android, and backend languages.</p>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                        View SDKs <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>

            <div className="space-y-16">
                <section id="intro-quickstart" className="scroll-m-24">
                    <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            To begin integrating SharePay, you'll need to obtain your API keys from the <span className="text-primary font-medium hover:underline cursor-pointer">Developer Dashboard</span>. We provide both <code>test</code> and <code>live</code> keys. Never share your secret keys or include them in client-side code.
                        </p>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border-l-4 border-primary shadow-sm mb-6">
                            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground leading-relaxed">
                                Our API versioning follows a date-based format. The current version is <code className="bg-background px-1.5 py-0.5 rounded text-xs border border-border shadow-sm text-muted-foreground font-mono">2023-10-27</code>.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="intro-charge" className="scroll-m-24">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-4">Create a Charge</h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                To charge a credit card, send a POST request to the <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground font-mono">/v1/charges</code> endpoint. You must provide an amount and a currency, along with a source identifier (tokenized payment data).
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground font-medium">Secure server-side processing</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground font-medium">Automatic fraud detection</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground font-medium">Instant status response</span>
                                </li>
                            </ul>
                        </div>

                        {/* Code Sample Column */}
                        <div className="w-full lg:w-[450px] xl:w-[500px] shrink-0">
                            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl">
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                        <span className="ml-3 text-xs font-mono font-medium text-slate-400">POST /v1/charges</span>
                                    </div>
                                    <button className="text-slate-400 hover:text-white transition-colors" title="Copy to clipboard">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                                    <pre className="text-slate-300">
                                        <span className="text-[#ff7b72]">curl</span> <span className="text-[#a5d6ff]">https://api.sharepay.com/v1/charges</span> \
                                        <span className="text-[#ff7b72]">-u</span> sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
                                        <span className="text-[#ff7b72]">-d</span> <span className="text-[#a5d6ff]">amount</span>=2000 \
                                        <span className="text-[#ff7b72]">-d</span> <span className="text-[#a5d6ff]">currency</span>=xof \
                                        <span className="text-[#ff7b72]">-d</span> <span className="text-[#a5d6ff]">source</span>=tok_visa \
                                        <span className="text-[#ff7b72]">-d</span> <span className="text-[#a5d6ff]">description</span>=<span className="text-[#79c0ff]">"Order #1234"</span>
                                    </pre>
                                    <div className="mt-6 pt-6 border-t border-slate-700/50">
                                        <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Sample Response</div>
                                        <pre className="text-[#c9d1d9]">
                                            {`{
  `}
                                            <span className="text-[#7ee787]">"id"</span>: <span className="text-[#a5d6ff]">"ch_3N5b2X..."</span>,
                                            <span className="text-[#7ee787]">"object"</span>: <span className="text-[#a5d6ff]">"charge"</span>,
                                            <span className="text-[#7ee787]">"amount"</span>: <span className="text-[#d2a8ff]">2000</span>,
                                            <span className="text-[#7ee787]">"status"</span>: <span className="text-[#a5d6ff]">"succeeded"</span>,
                                            <span className="text-[#7ee787]">"paid"</span>: <span className="text-[#79c0ff]">true</span>
                                            {`}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
