"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10 bg-background">
            {/* 1. Base Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

            {/* 2. Floating Orbs/Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 100, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -100, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]"
            />

            {/* 3. Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        </div>
    );
}
