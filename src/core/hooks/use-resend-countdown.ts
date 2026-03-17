import { useState, useEffect, useCallback } from 'react';

/**
 * Hook logic to manage a resend countdown timer with persistence.
 */
export function useResendCountdown(key: string, initialDuration: number = 60) {
    const [timeLeft, setTimeLeft] = useState(0);
    const storageKey = `resend_countdown_${key}`;

    const getRemaining = useCallback(() => {
        if (typeof window === 'undefined') return 0;
        try {
            const stored = localStorage.getItem(storageKey);
            if (!stored) return 0;
            const target = parseInt(stored, 10);
            const remaining = Math.ceil((target - Date.now()) / 1000);
            return remaining > 0 ? remaining : 0;
        } catch (e) {
            return 0;
        }
    }, [storageKey]);

    const startCountdown = useCallback(() => {
        if (typeof window === 'undefined') return;
        const target = Date.now() + (initialDuration * 1000);
        try {
            localStorage.setItem(storageKey, target.toString());
            setTimeLeft(initialDuration);
        } catch (e) {
            // Fallback to memory-only if localStorage fails
            setTimeLeft(initialDuration);
        }
    }, [storageKey, initialDuration]);

    useEffect(() => {
        // Initial check on mount
        const initial = getRemaining();
        if (initial > 0) setTimeLeft(initial);

        const timer = setInterval(() => {
            const remaining = getRemaining();
            
            // If we have a local state timer but no storage, or vice versa, sync up
            if (remaining <= 0) {
                setTimeLeft(0);
                try {
                    localStorage.removeItem(storageKey);
                } catch (e) {}
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [getRemaining, storageKey]);

    return {
        timeLeft,
        isCountingDown: timeLeft > 0,
        startCountdown
    };
}
