"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Play, Copy, Terminal } from "lucide-react";
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
        <section className="py-24 overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
                            <Terminal className="h-4 w-4" />
                            <span>Developer First</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('title')}</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            {t('subtitle')}
                        </p>

                        <ul className="space-y-4">
                            {[
                                "RESTful API with predictable resource-oriented URLs",
                                "Real-time webhooks for events",
                                "SDKs for Node, Python, PHP, and more",
                                "Comprehensive documentation and guides"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                        <Check className="h-3.5 w-3.5 text-green-600" />
                                    </div>
                                    <span className="text-foreground/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Interactive Console */}
                    <div className="relative">
                        {/* Decoration Circles */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />

                        <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-white/10">
                            {/* Window Controls */}
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="text-xs text-muted-foreground font-mono">
                                    POST /v1/payments
                                </div>
                            </div>

                            {/* Code Area */}
                            <div className="p-6 font-mono text-sm overflow-x-auto">
                                <div className="text-blue-400 mb-4">// Initialize payment request</div>
                                <pre className="text-gray-300">
                                    {codeSnippet}
                                </pre>
                            </div>

                            {/* Actions Bar */}
                            <div className="px-4 py-3 bg-white/5 border-t border-white/5 flex justify-between items-center">
                                <div className="text-xs text-gray-500">Node.js SDK v2.0</div>
                                <Button
                                    size="sm"
                                    onClick={runRequest}
                                    disabled={isRunning || !!response}
                                    className={`transition-all ${response ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                >
                                    {isRunning ? (
                                        <span className="animate-pulse">Running...</span>
                                    ) : response ? (
                                        <>
                                            <Check className="h-4 w-4 mr-2" />
                                            200 OK
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-4 w-4 mr-2" />
                                            {t('runBtn')}
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Response Area */}
                            <AnimatePresence>
                                {response && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-white/10 bg-[#151515]"
                                    >
                                        <div className="p-4 font-mono text-sm">
                                            <div className="text-green-400 mb-2">// Server Response (200 OK)</div>
                                            <pre className="text-green-300/90 whitespace-pre-wrap">
                                                {response}
                                            </pre>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
