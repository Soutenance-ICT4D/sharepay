"use client";

import { ChevronRight, Key, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { RightNavItem } from "../developers-right-nav";

export const authenticationNavItems: RightNavItem[] = [
    { id: "auth-overview", label: "Overview", isActive: true },
    { id: "auth-api-keys", label: "API Keys" },
    { id: "auth-best-practices", label: "Best Practices" }
];

export function DevelopersAuthentication() {
    return (
        <div className="max-w-[70rem] mx-auto pb-16">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <span className="hover:text-primary transition-colors cursor-pointer">Docs</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground font-medium">Getting Started</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground font-medium">Authentication</span>
            </nav>

            <h1 id="auth-overview" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 scroll-m-24">
                Authentication
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Authenticate your SharePay API requests using your account's API keys. If you do not include your key when making an API request, or use one that is incorrect or outdated, SharePay returns an error.
            </p>

            <div className="space-y-16">
                <section id="auth-api-keys" className="scroll-m-24">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <Key className="h-6 w-6 text-primary" />
                        API Keys
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Every account is provided with two sets of keys: <code>Test mode</code> and <code>Live mode</code>. All API requests exist in either test or live mode, and one mode cannot be manipulated by data in the other.
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm mb-8">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-semibold">Key Type</th>
                                        <th scope="col" className="px-6 py-3 font-semibold">Description</th>
                                        <th scope="col" className="px-6 py-3 font-semibold">Usage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-mono font-medium text-primary">sk_test_...</td>
                                        <td className="px-6 py-4 text-foreground">Secret Test Key</td>
                                        <td className="px-6 py-4 text-muted-foreground">Used on your backend server for testing. Can perform any API request.</td>
                                    </tr>
                                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-mono font-medium text-emerald-600 dark:text-emerald-500">sk_live_...</td>
                                        <td className="px-6 py-4 text-foreground">Secret Live Key</td>
                                        <td className="px-6 py-4 text-muted-foreground">Used on your backend server to create real charges. Keep this secure.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-mono font-medium text-amber-600 dark:text-amber-500">pk_test_...</td>
                                        <td className="px-6 py-4 text-foreground">Publishable Key</td>
                                        <td className="px-6 py-4 text-muted-foreground">Used in client-side code (web, iOS, Android) to tokenize payment details securely.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section id="auth-best-practices" className="scroll-m-24">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        Security Best Practices
                    </h2>

                    <div className="grid gap-4 mt-6">
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card shadow-sm">
                            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Never share your secret keys</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Your secret API keys can perform any action on your account without restriction. Keep them completely confidential. Never commit them to version control (like GitHub) or use them in client-side code (like frontend scripts or mobile apps).
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card shadow-sm">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Use Environment Variables</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Store your secret keys in environment variables on your server (e.g., <code>.env</code> files). This ensures they are injected securely at runtime and are never hardcoded into your source files.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
