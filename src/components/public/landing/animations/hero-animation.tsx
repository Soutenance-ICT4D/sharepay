"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function HeroAnimation() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Handle Parallax
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const y = (clientY / window.innerHeight - 0.5) * 20; // -10 to 10
        setMousePosition({ x, y });
    };

    return (
        <div
            className="relative w-full h-full flex items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            {/* Parallax Container */}
            <motion.div
                animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center p-20" // added padding to ensure moving area
            >
                {/* 1. CENTRAL POINT: SHAREPAY LOGO */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-20 w-32 h-32 bg-background rounded-full shadow-[0_0_60px_rgba(var(--primary),0.2)] border flex items-center justify-center"
                >
                    <div className="relative w-16 h-16">
                        <Image src="/images/logo_sharepay_bg_remove_svg.svg" alt="SharePay Logo" fill className="object-contain" priority />
                    </div>
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
                    <div className="absolute -inset-4 rounded-full border border-primary/10 animate-pulse opacity-40" />
                </motion.div>

                {/* 2. INCOMING ENERGY LINES (The Flow) */}
                {/* We create lines converging from edges to center */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 600 600">
                        <defs>
                            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(var(--primary), 0)" />
                                <stop offset="50%" stopColor="rgba(var(--primary), 1)" />
                                <stop offset="100%" stopColor="rgba(var(--primary), 0)" />
                            </linearGradient>
                        </defs>

                        {/* Top Left Stream */}
                        <motion.path
                            d="M 50 50 Q 150 150 300 300"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0], strokeDashoffset: [0, -20] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Bottom Right Stream */}
                        <motion.path
                            d="M 550 550 Q 450 450 300 300"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                        {/* Bottom Left Stream */}
                        <motion.path
                            d="M 50 550 Q 150 450 300 300"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
                        />
                        {/* Top Right Stream */}
                        <motion.path
                            d="M 550 50 Q 450 150 300 300"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.2 }}
                        />
                    </svg>
                </div>

                {/* 3. PARTICLE SOURCES (Payment Methods) */}
                {[
                    { label: "Mobile Money", x: "-200px", y: "-150px", color: "bg-yellow-500" },
                    { label: "Banks", x: "200px", y: "-150px", color: "bg-blue-500" },
                    { label: "Cards", x: "-180px", y: "180px", color: "bg-purple-500" },
                    { label: "Wallet", x: "200px", y: "150px", color: "bg-orange-500" },
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        className={`absolute px-4 py-2 rounded-full text-xs font-bold bg-card border shadow-lg flex items-center gap-2`}
                        style={{ x: item.x, y: item.y }}
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        {item.label}
                    </motion.div>
                ))}

                {/* 4. UPWARD IMPULSE (Success/Growth) */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 200, opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                    className="absolute bottom-[50%] left-[calc(50%-1px)] w-[2px] bg-gradient-to-t from-primary to-transparent z-0 origin-bottom"
                />
            </motion.div>
        </div>
    );
}
