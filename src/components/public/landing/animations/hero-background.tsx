"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10 bg-background pointer-events-none">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

            {/* Floating Orbs/Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[10%] -left-[10%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-primary/20 rounded-full blur-[100px] sm:blur-[160px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.15, 0.05],
                    x: [0, -50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-[10%] -right-[10%] w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-blue-500/10 rounded-full blur-[120px] sm:blur-[180px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.02, 0.08, 0.02],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1200px] h-[800px] sm:h-[1200px] bg-purple-500/10 rounded-full blur-[150px] sm:blur-[200px]"
            />

            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
        </div>
    );
}