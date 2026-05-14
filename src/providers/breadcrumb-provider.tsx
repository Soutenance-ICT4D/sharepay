"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface BreadcrumbContextValue {
    labels: Record<string, string>;
    setLabel: (segment: string, label: string) => void;
    clearLabel: (segment: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
    labels: {},
    setLabel: () => {},
    clearLabel: () => {},
});

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const [labels, setLabels] = useState<Record<string, string>>({});

    const setLabel = useCallback((segment: string, label: string) => {
        setLabels(prev => ({ ...prev, [segment]: label }));
    }, []);

    const clearLabel = useCallback((segment: string) => {
        setLabels(prev => {
            const next = { ...prev };
            delete next[segment];
            return next;
        });
    }, []);

    return (
        <BreadcrumbContext.Provider value={{ labels, setLabel, clearLabel }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);
