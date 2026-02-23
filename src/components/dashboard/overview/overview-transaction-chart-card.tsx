"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { OverviewTransactionPoint } from "@/core/data/dashboard";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DateRangePreset } from "@/core/data/dashboard";

type Mode = "volume" | "count";

// --- Helpers ---
const formatCurrencyXAF = (value: number) =>
    new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XAF",
        maximumFractionDigits: 0,
    }).format(value);

const buildSmoothPath = (points: Array<{ x: number; y: number }>, tension = 0.2) => {
    if (points.length < 2) return "";
    const d: string[] = [`M${points[0].x},${points[0].y}`];
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] ?? points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] ?? p2;

        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;

        d.push(`C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`);
    }
    return d.join(" ");
};

// --- Component ---
export function OverviewTransactionChartCard({
    title,
    subtitle,
    data,
    onDateRangeChange
}: {
    title: string;
    subtitle: string;
    data: OverviewTransactionPoint[];
    onDateRangeChange?: (value: DateRangePreset, range?: { from?: string; to?: string }) => void;
}) {
    const [mode, setMode] = useState<Mode>("volume");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const todayLabel = useMemo(() => {
        const now = new Date();
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(now);
    }, []);

    const [preset, setPreset] = useState<DateRangePreset>("last30");
    const [customFrom, setCustomFrom] = useState<string>("");
    const [customTo, setCustomTo] = useState<string>("");
    const [dateMenuOpen, setDateMenuOpen] = useState(false);

    useEffect(() => {
        const handler = (event: PointerEvent) => {
            const root = rootRef.current;
            if (!root) return;

            const path = (event.composedPath?.() ?? []) as EventTarget[];
            const isInside = path.length ? path.includes(root) : root.contains(event.target as Node | null);

            if (!isInside) {
                setDateMenuOpen(false);
            }
        };

        window.addEventListener("pointerdown", handler, true);
        return () => {
            window.removeEventListener("pointerdown", handler, true);
        };
    }, []);

    const presetLabel = useMemo(() => {
        if (preset === "today") return `Aujourd'hui (${todayLabel})`;
        if (preset === "last7") return "7 derniers jours";
        if (preset === "last30") return "30 derniers jours";
        return "Personnaliser";
    }, [preset, todayLabel]);

    const setPresetAndNotify = (next: DateRangePreset) => {
        setPreset(next);
        setDateMenuOpen(false);
        if (next !== "custom") {
            setCustomFrom("");
            setCustomTo("");
            onDateRangeChange?.(next);
        } else {
            onDateRangeChange?.("custom", { from: customFrom, to: customTo });
        }
    };


    const { points, linePath, areaPath, xLabels } = useMemo(() => {
        if (!data.length) return { points: [], linePath: "", areaPath: "", xLabels: [] };

        const values = data.map((d) => (mode === "volume" ? d.volume : d.count));
        const maxVal = Math.max(...values, 1) * 1.2; // 20% d'espace en haut

        // On travaille sur un référentiel 1000x100 pour plus de précision dans les arrondis SVG
        const mapped = data.map((p, i) => {
            const val = mode === "volume" ? p.volume : p.count;
            const x = (i / (data.length - 1)) * 1000;
            const y = 100 - (val / maxVal) * 100;
            return { ...p, x, y, value: val };
        });

        const line = buildSmoothPath(mapped);
        const area = `${line} L1000,100 L0,100 Z`;

        return {
            points: mapped,
            linePath: line,
            areaPath: area,
            xLabels: data.length > 8 ? [data[0].label, data[Math.floor(data.length / 2)].label, data[data.length - 1].label] : data.map(d => d.label)
        };
    }, [data, mode]);

    const activePoint = activeIndex !== null ? points[activeIndex] : null;

    return (
        <div className="xl:col-span-2 bg-card text-card-foreground rounded-xl border p-6 shadow-sm flex flex-col pt-0 pb-0" ref={rootRef}>
            <div className="flex flex-col sm:flex-row gap-4 lg:items-center lg:justify-between py-6">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-end gap-3 sm:items-center">
                    {preset === "custom" ? (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                            <input
                                type="date"
                                value={customFrom}
                                onChange={(e) => {
                                    setCustomFrom(e.target.value);
                                    onDateRangeChange?.("custom", { from: e.target.value, to: customTo });
                                }}
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm font-bold text-foreground shadow-sm w-full sm:w-auto"
                            />
                            <input
                                type="date"
                                value={customTo}
                                onChange={(e) => {
                                    setCustomTo(e.target.value);
                                    onDateRangeChange?.("custom", { from: customFrom, to: e.target.value });
                                }}
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm font-bold text-foreground shadow-sm w-full sm:w-auto"
                            />
                        </div>
                    ) : null}

                    <div className="relative w-full sm:w-auto">
                        <button
                            type="button"
                            className="w-full sm:w-auto h-10 inline-flex items-center justify-between sm:justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-bold text-foreground shadow-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            aria-haspopup="menu"
                            aria-expanded={dateMenuOpen}
                            onClick={() => setDateMenuOpen((value) => !value)}
                        >
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <span className="whitespace-nowrap">{presetLabel}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </button>

                        {dateMenuOpen ? (
                            <div
                                className="absolute right-0 mt-2 w-full sm:w-[240px] rounded-md border bg-card text-card-foreground shadow-lg z-50 overflow-hidden"
                                role="menu"
                            >
                                <button
                                    type="button"
                                    className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-muted"
                                    role="menuitem"
                                    onClick={() => setPresetAndNotify("today")}
                                >
                                    Aujourd'hui ({todayLabel})
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-muted"
                                    role="menuitem"
                                    onClick={() => setPresetAndNotify("last7")}
                                >
                                    7 derniers jours
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-muted"
                                    role="menuitem"
                                    onClick={() => setPresetAndNotify("last30")}
                                >
                                    30 derniers jours
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-muted"
                                    role="menuitem"
                                    onClick={() => setPresetAndNotify("custom")}
                                >
                                    Personnaliser
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex bg-muted/50 p-1 rounded-lg border w-full sm:w-auto justify-center sm:justify-start">
                        {(["volume", "count"] as const).map((m) => (
                            <Button
                                key={m}
                                size="sm"
                                variant={mode === m ? "secondary" : "ghost"}
                                className={`text-xs h-7 px-3 ${mode === m ? "shadow-sm" : "text-muted-foreground"}`}
                                onClick={() => setMode(m)}
                            >
                                {m === "volume" ? "Volume" : "Nombre"}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative h-[240px] w-full group mb-8" ref={containerRef}>
                {/* Grille horizontale en arrière-plan */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="border-t border-muted/30 w-full" />
                    ))}
                </div>

                <svg
                    viewBox="0 0 1000 100"
                    className="absolute inset-0 w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Ligne et Aire avec transition fluide */}
                    <path
                        d={areaPath}
                        fill="url(#chartGradient)"
                        className="transition-all duration-500 ease-in-out"
                    />
                    <path
                        d={linePath}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-500 ease-in-out"
                    />

                    {/* Point actif (SVG) */}
                    {activePoint && (
                        <g className="transition-all duration-200">
                            <line
                                x1={activePoint.x} y1="0" x2={activePoint.x} y2="100"
                                stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 2" opacity="0.5"
                            />
                            <circle
                                cx={activePoint.x}
                                cy={activePoint.y}
                                r="4"
                                className="fill-background stroke-[3px] stroke-primary"
                            />
                        </g>
                    )}

                    {/* Zones de capture invisible pour une interaction parfaite */}
                    {points.map((p, i) => (
                        <rect
                            key={i}
                            x={i === 0 ? 0 : p.x - (500 / (points.length - 1))}
                            y="0"
                            width={1000 / (points.length - 1)}
                            height="100"
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        />
                    ))}
                </svg>

                {/* Tooltip flottant (HTML pour un meilleur rendu texte) */}
                {activePoint && (
                    <div
                        className="absolute pointer-events-none transition-all duration-75 z-10"
                        style={{
                            left: `${(activePoint.x / 1000) * 100}%`,
                            top: `${activePoint.y}%`,
                            transform: "translate(-50%, -120%)",
                        }}
                    >
                        <div className="bg-popover border shadow-xl rounded-lg p-2 min-w-[120px]">
                            <div className="text-[10px] text-muted-foreground font-medium uppercase">{activePoint.label}</div>
                            <div className="text-sm font-bold">
                                {mode === "volume" ? formatCurrencyXAF(activePoint.value) : activePoint.value}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Labels X */}
            <div className="flex justify-between pb-6 mt-auto">
                {points.filter((_, i) => i % Math.ceil(points.length / 6) === 0 || i === points.length - 1).map((p, i) => (
                    <span key={i} className="text-[11px] font-medium text-muted-foreground">
                        {p.label}
                    </span>
                ))}
            </div>
        </div>
    );
}