"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Check, Play, Copy, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntegrationSection() {
    const t = useTranslations('Landing.Integration');
    const [isRunning, setIsRunning] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const codeSnippet = `
const sharepay = require('sharepay-node');

const client = new sharepay.Client({
  apiKey: 'sk_live_...'
});

const payment = await client.payments.create({
  amount: 5000,
  currency: 'XAF',
  provider: 'mtn_momo',
  phone: '+237612345678'
});
`.trim();

    const successResponse = `
{
  "id": "pay_123456789",
  "status": "pending",
  "amount": 5000,
  "currency": "XAF",
  "provider_response": {
    "message": "Payment initiated"
  }
}
`.trim();

    const runRequest = () => {
        setIsRunning(true);
        setResponse(null);
        setTimeout(() => {
            setIsRunning(false);
            setResponse(successResponse);
        }, 1500);
    };

    return (
        <section className="py-16 md:py-20 overflow-hidden relative bg-background">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                        {t('title')}
                    </h2>
                    
                    <p className="text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <ul className="space-y-6">
                            {[
                                t('check1'),
                                t('check2'),
                                t('check3'),
                                t('check4')
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 group">
                                    <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                        <Check className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <span className="text-foreground/90 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Interactive Console */}
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[2rem] blur-2xl opacity-50" />

                        <div className="relative bg-[#0d0d0d] rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.03] border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10">
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Post</span>
                                    <span className="text-[10px] text-gray-400 font-mono">/v1/payments</span>
                                </div>
                            </div>

                            {/* Code Content */}
                            <div className="p-8 font-mono text-xs sm:text-sm overflow-x-auto min-h-[300px]">
                                <div className="flex gap-4">
                                    <div className="flex flex-col text-gray-600 select-none border-r border-white/5 pr-4 text-right">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <span key={i}>{i + 1}</span>
                                        ))}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-emerald-500/60 italic mb-4">{t('sdkComment')}</div>
                                        <div className="text-gray-300 leading-relaxed whitespace-pre font-mono">
                                            {codeSnippet.split('\n').map((line, i) => {
                                                // Minimal syntax highlighting
                                                const highlightedLine = line
                                                    .replace(/(require|new|await|const)/g, '<span class="text-purple-400">$1</span>')
                                                    .replace(/(\.payments\.create)/g, '<span class="text-blue-400">$1</span>')
                                                    .replace(/('.*')/g, '<span class="text-amber-300">$1</span>')
                                                    .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>');
                                                
                                                return (
                                                    <div 
                                                        key={i} 
                                                        dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }} 
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Console Actions */}
                            <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {t('liveEnv')}
                                </div>
                                <Button
                                    size="sm"
                                    onClick={runRequest}
                                    disabled={isRunning || !!response}
                                    className={`h-9 px-5 rounded-full font-bold transition-all duration-300 ${
                                        response 
                                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                                        : 'bg-primary hover:scale-105 active:scale-95'
                                    }`}
                                >
                                    {isRunning ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>{t('sending')}</span>
                                        </div>
                                    ) : response ? (
                                        <div className="flex items-center gap-2">
                                            <Check className="h-4 w-4" />
                                            <span>200 OK</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Play className="h-4 w-4 fill-current" />
                                            <span>{t('runBtn')}</span>
                                        </div>
                                    )}
                                </Button>
                            </div>

                            {/* Results Panel */}
                            {response && (
                                <div className="border-t border-white/10 bg-[#050505] transition-all duration-500 overflow-hidden">
                                    <div className="p-6 font-mono text-xs sm:text-sm">
                                        <div className="flex items-center gap-2 text-emerald-500 mb-3 text-[10px] font-bold uppercase tracking-widest">
                                            <Sparkles className="h-3 w-3" />
                                            {t('serverResp')}
                                        </div>
                                        <pre className="text-emerald-400/90 whitespace-pre-wrap leading-relaxed bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                                            {response}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
