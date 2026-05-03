"use client";

import { useMemo, useState, useId, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { MockTransaction } from "./mock-data";

// ── Types ─────────────────────────────────────────────────────────────────────

type ChartInterval = "TODAY" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_3_MONTHS" | "LAST_6_MONTHS" | "THIS_YEAR";
type ChartMetric   = "COUNT" | "VOLUME";
type ChartGroupBy  = "STATUS" | "PROVIDER" | "APPLICATION";

interface Series {
    key:     string;
    color:   string;
    counts:  number[];
    volumes: number[];
}

interface ChartData {
    labels: string[];
    series: Series[];
}

// ── SVG layout ────────────────────────────────────────────────────────────────

const VB_W = 1060;
const VB_H = 310;
const ML   = 56;
const MR   = 16;
const MT   = 14;
const MB   = 38;
const IW   = VB_W - ML - MR;
const IH   = VB_H - MT - MB;

// ── Math helpers ──────────────────────────────────────────────────────────────

function computeNiceTicks(rawMax: number, tickCount = 5): { niceMax: number; ticks: number[] } {
    if (rawMax === 0) return { niceMax: 10, ticks: [0, 2, 4, 6, 8, 10] };
    const rawStep  = rawMax / (tickCount - 1);
    const mag      = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const niceStep = Math.max(1, Math.round(Math.ceil(rawStep / mag) * mag));
    const niceMax  = niceStep * (tickCount - 1);
    return { niceMax, ticks: Array.from({ length: tickCount }, (_, i) => i * niceStep) };
}

function buildSmoothPath(
    pts: { x: number; y: number }[],
    tension = 0.1,
    yMin = -Infinity,
    yMax = Infinity,
): string {
    if (pts.length === 0) return "";
    if (pts.length === 1) return `M${pts[0].x},${pts[0].y}`;
    const cy = (y: number) => Math.max(yMin, Math.min(yMax, y));
    const d: string[] = [`M${pts[0].x},${pts[0].y}`];
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] ?? p2;
        d.push(`C${p1.x + (p2.x - p0.x) * tension},${cy(p1.y + (p2.y - p0.y) * tension)} ${p2.x - (p3.x - p1.x) * tension},${cy(p2.y - (p3.y - p1.y) * tension)} ${p2.x},${p2.y}`);
    }
    return d.join(" ");
}

function fmtVolume(v: number): string {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000)     return `${Math.round(v / 1_000)}k`;
    return String(v);
}

// ── Seeded random & wave helpers ──────────────────────────────────────────────

function seededRand(n: number): number {
    let h = (n + 1) * 2_654_435_761;
    h = ((h ^ (h >>> 16)) * 0x45d9f3b) & 0xffffffff;
    return (h >>> 0) / 0x1_0000_0000;
}

function noisyCount(base: number, i: number, seriesOffset: number): number {
    const noise = 0.65 + seededRand(i * 37 + seriesOffset * 13) * 0.7;
    return Math.max(0, Math.round(base * noise));
}

// ── Group / series config ─────────────────────────────────────────────────────

const BASE_DATE = new Date("2026-05-03T00:00:00.000Z");

const GROUP_CONFIG: Record<ChartGroupBy, { key: string; color: string; share: number; avgTx: number }[]> = {
    STATUS: [
        { key: "SUCCESS",   color: "#10b981", share: 0.68, avgTx: 25_000 },
        { key: "PENDING",   color: "#f59e0b", share: 0.10, avgTx: 12_000 },
        { key: "FAILED",    color: "#ef4444", share: 0.14, avgTx:  6_000 },
        { key: "CANCELLED", color: "#94a3b8", share: 0.05, avgTx:  4_000 },
        { key: "REFUNDED",  color: "#3b82f6", share: 0.03, avgTx: 18_000 },
    ],
    PROVIDER: [
        { key: "MTN",    color: "#fbbf24", share: 0.62, avgTx: 18_000 },
        { key: "ORANGE", color: "#f97316", share: 0.38, avgTx: 22_000 },
    ],
    APPLICATION: [
        { key: "E-commerce Principal",   color: "#6366f1", share: 0.42, avgTx: 32_000 },
        { key: "Système de réservation", color: "#8b5cf6", share: 0.35, avgTx: 14_000 },
        { key: "Abonnements Premium",    color: "#ec4899", share: 0.23, avgTx: 55_000 },
    ],
};

// Bucket total for each interval point
function bucketTotal(interval: ChartInterval, i: number): number {
    switch (interval) {
        case "TODAY": {
            // Business-hours shape: low at night, peak at midday
            if (i < 6)  return Math.round(2  * (0.5 + seededRand(i * 5)));
            if (i < 9)  return Math.round(8  * (0.7 + seededRand(i * 5) * 0.6));
            if (i < 19) return Math.round(20 * (0.85 + seededRand(i * 5) * 0.3) * (1 + 0.3 * Math.sin(((i - 9) / 10) * Math.PI)));
            if (i < 22) return Math.round(10 * (0.6 + seededRand(i * 5) * 0.4));
            return Math.round(3 * (0.4 + seededRand(i * 5)));
        }
        case "LAST_7_DAYS":
        case "LAST_30_DAYS":
            return Math.round(45 * (0.6 + seededRand(i * 7) * 0.8));
        case "LAST_3_MONTHS":
            return Math.round(300 * (0.65 + seededRand(i * 11) * 0.7));
        case "LAST_6_MONTHS":
        case "THIS_YEAR":
            return Math.round(1_300 * (0.65 + seededRand(i * 13) * 0.7));
    }
}

// ── Date / label generation ───────────────────────────────────────────────────

const MONTH_SHORT_FR = ["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
const DAY_SHORT_FR   = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];

function getLabels(interval: ChartInterval): string[] {
    switch (interval) {
        case "TODAY":
            return Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}h`);
        case "LAST_7_DAYS":
            return Array.from({ length: 7 }, (_, i) => {
                const d = new Date(BASE_DATE);
                d.setUTCDate(d.getUTCDate() - (6 - i));
                return DAY_SHORT_FR[d.getUTCDay()];
            });
        case "LAST_30_DAYS":
            return Array.from({ length: 30 }, (_, i) => {
                const d = new Date(BASE_DATE);
                d.setUTCDate(d.getUTCDate() - (29 - i));
                return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
            });
        case "LAST_3_MONTHS":
            return Array.from({ length: 13 }, (_, i) => {
                const d = new Date(BASE_DATE);
                d.setUTCDate(d.getUTCDate() - (12 - i) * 7);
                return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
            });
        case "LAST_6_MONTHS":
            return Array.from({ length: 6 }, (_, i) => {
                const d = new Date(BASE_DATE.getFullYear(), BASE_DATE.getMonth() - (5 - i), 1);
                return `${MONTH_SHORT_FR[d.getMonth()]} ${d.getFullYear()}`;
            });
        case "THIS_YEAR":
            return MONTH_SHORT_FR.map((m) => `${m} ${BASE_DATE.getFullYear()}`);
    }
}

// ── Data builder ──────────────────────────────────────────────────────────────

function buildChartData(
    interval: ChartInterval,
    groupBy:  ChartGroupBy,
    baseTx:   MockTransaction[],
): ChartData {
    const labels   = getLabels(interval);
    const n        = labels.length;
    const cfgList  = GROUP_CONFIG[groupBy];

    // For real-data intervals (7d / 30d), try to use actual mock transactions first
    const useReal = interval === "LAST_7_DAYS" || interval === "LAST_30_DAYS";
    const toSlice = (d: Date) => d.toISOString().slice(0, 10);

    const getRealTotal = (i: number): number | null => {
        if (!useReal) return null;
        const d = new Date(BASE_DATE);
        d.setUTCDate(d.getUTCDate() - ((interval === "LAST_7_DAYS" ? 6 : 29) - i));
        const dayStr = toSlice(d);
        const count  = baseTx.filter((tx) => tx.createdAt.startsWith(dayStr)).length;
        return count > 0 ? count : null;
    };

    const series: Series[] = cfgList.map((cfg, si) => {
        const counts  = Array.from({ length: n }, (_, i) => {
            // Future months (THIS_YEAR) = 0
            if (interval === "THIS_YEAR" && i > BASE_DATE.getMonth()) return 0;
            const total = getRealTotal(i) ?? bucketTotal(interval, i);
            return noisyCount(total * cfg.share, i, si);
        });
        const volumes = counts.map((c, i) =>
            Math.round(c * cfg.avgTx * (0.75 + seededRand(i * 19 + si * 7) * 0.5))
        );
        return { key: cfg.key, color: cfg.color, counts, volumes };
    });

    return { labels, series };
}

// ── Multi-series SVG chart ────────────────────────────────────────────────────

function MultiSeriesChart({
    data, metric, seriesLabels,
}: {
    data:         ChartData;
    metric:       ChartMetric;
    seriesLabels: (key: string) => string;
}) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const uid    = useId().replace(/:/g, "");
    const clipId = `tx-clip-${uid}`;

    const { labels, series } = data;
    const n = labels.length;

    const vals = (s: Series) => metric === "VOLUME" ? s.volumes : s.counts;

    const rawMax = useMemo(
        () => Math.max(...series.flatMap((s) => vals(s)), 0),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [series, metric],
    );
    const { niceMax, ticks: yTicks } = useMemo(() => computeNiceTicks(rawMax), [rawMax]);

    const yFor = (v: number) => MT + IH - (v / niceMax) * IH;
    const xFor = (i: number) => ML + (n === 1 ? IW / 2 : (i / (n - 1)) * IW);
    const baseline = yFor(0);

    const seriesPts = useMemo(
        () => series.map((s) => vals(s).map((v, i) => ({ x: xFor(i), y: yFor(v), value: v }))),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [series, n, niceMax, metric],
    );

    const xTicks = useMemo(() => {
        if (n <= 8) return labels.map((l, i) => ({ label: l, x: xFor(i) }));
        const step = Math.ceil(n / 7);
        return labels
            .map((l, i) => ({ label: l, i }))
            .filter(({ i }) => i % step === 0 || i === n - 1)
            .map(({ label, i }) => ({ label, x: xFor(i) }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labels, n]);

    return (
        <div className="relative w-full">
            <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="w-full h-[180px] sm:h-[260px]"
                preserveAspectRatio="none"
            >
                <defs>
                    <clipPath id={clipId}>
                        <rect x={ML} y={MT} width={IW} height={IH} />
                    </clipPath>
                </defs>

                {/* Grid + Y labels */}
                {yTicks.map((tick) => {
                    const y = yFor(tick);
                    return (
                        <g key={tick}>
                            <line
                                x1={ML} y1={y} x2={ML + IW} y2={y}
                                stroke="currentColor"
                                strokeWidth={tick === 0 ? 1.2 : 0.6}
                                strokeDasharray={tick === 0 ? undefined : "4 4"}
                                className={tick === 0 ? "text-border" : "text-muted-foreground/25"}
                            />
                            <text
                                x={ML - 8} y={y}
                                textAnchor="end" dominantBaseline="middle"
                                fontSize={11} className="fill-muted-foreground font-medium"
                                style={{ fontFamily: "inherit" }}
                            >
                                {metric === "VOLUME" ? fmtVolume(tick) : tick}
                            </text>
                        </g>
                    );
                })}

                {/* Vertical hover guide */}
                {activeIndex !== null && (
                    <line
                        x1={xFor(activeIndex)} y1={MT} x2={xFor(activeIndex)} y2={baseline}
                        stroke="currentColor" strokeWidth={0.8} strokeDasharray="4 3"
                        className="text-muted-foreground/40"
                    />
                )}

                {/* Series lines */}
                <g clipPath={`url(#${clipId})`}>
                    {series.map((s, si) => (
                        <path
                            key={s.key}
                            d={buildSmoothPath(seriesPts[si], 0.1, MT, baseline)}
                            fill="none" stroke={s.color} strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round" opacity="0.9"
                        />
                    ))}
                </g>

                {/* Hover dots */}
                {activeIndex !== null && series.map((s, si) => {
                    const pt = seriesPts[si]?.[activeIndex];
                    if (!pt) return null;
                    return (
                        <circle key={s.key}
                            cx={pt.x} cy={Math.max(MT, Math.min(baseline, pt.y))}
                            r="4" fill="white" stroke={s.color} strokeWidth="2.5"
                        />
                    );
                })}

                {/* X labels */}
                {xTicks.map(({ label, x }, i) => (
                    <text key={i} x={x} y={VB_H - 6}
                        textAnchor="middle" fontSize={10.5}
                        className="fill-muted-foreground" style={{ fontFamily: "inherit" }}
                    >
                        {label}
                    </text>
                ))}

                {/* Hover zones */}
                {Array.from({ length: n }).map((_, i) => {
                    const cx    = xFor(i);
                    const zoneW = n === 1 ? IW : IW / (n - 1);
                    return (
                        <rect key={i}
                            x={Math.max(ML, cx - zoneW / 2)} y={MT}
                            width={Math.min(zoneW, ML + IW - Math.max(ML, cx - zoneW / 2))} height={IH}
                            fill="transparent" className="cursor-crosshair"
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        />
                    );
                })}
            </svg>

            {/* Tooltip */}
            {activeIndex !== null && (
                <div
                    className="absolute pointer-events-none z-20"
                    style={{ left: `${(xFor(activeIndex) / VB_W) * 100}%`, top: 0, transform: "translateX(-50%)" }}
                >
                    <div className="bg-popover border shadow-xl rounded-lg p-3 min-w-[156px] text-xs mt-2">
                        <p className="font-semibold text-foreground mb-2">{labels[activeIndex]}</p>
                        {series.map((s) => (
                            <div key={s.key} className="flex items-center justify-between gap-3 mt-0.5">
                                <div className="flex items-center gap-1.5">
                                    <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                                    <span className="text-muted-foreground">{seriesLabels(s.key)}</span>
                                </div>
                                <span className="font-bold text-foreground">
                                    {metric === "VOLUME"
                                        ? fmtVolume(s.volumes[activeIndex] ?? 0)
                                        : (s.counts[activeIndex] ?? 0)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TransactionsChart({ transactions }: { transactions: MockTransaction[] }) {
    const t = useTranslations("Dashboard.Transactions.Chart");

    const INTERVAL_OPTIONS: { value: ChartInterval; label: string }[] = [
        { value: "TODAY",         label: t("today") },
        { value: "LAST_7_DAYS",   label: t("last7Days") },
        { value: "LAST_30_DAYS",  label: t("last30Days") },
        { value: "LAST_3_MONTHS", label: t("last3Months") },
        { value: "LAST_6_MONTHS", label: t("last6Months") },
        { value: "THIS_YEAR",     label: t("thisYear") },
    ];
    const GROUPBY_OPTIONS: { value: ChartGroupBy; label: string }[] = [
        { value: "STATUS",      label: t("groupStatus") },
        { value: "PROVIDER",    label: t("groupProvider") },
        { value: "APPLICATION", label: t("groupApplication") },
    ];
    const METRIC_OPTIONS: { value: ChartMetric; label: string }[] = [
        { value: "COUNT",  label: t("metricCount") },
        { value: "VOLUME", label: t("metricVolume") },
    ];

    // Series label resolver (uses t for known keys, falls back to raw key for app names)
    const seriesLabels = (key: string): string => {
        const map: Record<string, string> = {
            SUCCESS: t("seriesSuccess"), PENDING: t("seriesPending"),
            FAILED:  t("seriesFailed"),  CANCELLED: t("seriesCancelled"), REFUNDED: t("seriesRefunded"),
            MTN:     t("seriesMTN"),     ORANGE: t("seriesOrange"),
        };
        return map[key] ?? key;
    };

    const [interval,          setInterval]          = useState<ChartInterval>("LAST_30_DAYS");
    const [groupBy,           setGroupBy]           = useState<ChartGroupBy>("STATUS");
    const [metric,            setMetric]            = useState<ChartMetric>("COUNT");
    const [periodMenuOpen,    setPeriodMenuOpen]    = useState(false);
    const [groupMenuOpen,     setGroupMenuOpen]     = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const rootRef   = useRef<HTMLDivElement>(null);
    const mobileRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setPeriodMenuOpen(false);
                setGroupMenuOpen(false);
            }
            if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
                setMobileFiltersOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const chartData = useMemo(
        () => buildChartData(interval, groupBy, transactions),
        [interval, groupBy, transactions],
    );

    const intervalLabel = INTERVAL_OPTIONS.find((o) => o.value === interval)?.label ?? interval;
    const groupByLabel  = GROUPBY_OPTIONS.find((o) => o.value === groupBy)?.label  ?? groupBy;

    // Mobile filter ToggleGroup helper
    const ToggleGroup = ({ options, active, onChange }: {
        options:  { value: string; label: string }[];
        active:   string;
        onChange: (v: string) => void;
    }) => (
        <div className="flex bg-muted/50 p-1 rounded-lg border">
            {options.map(({ value, label }) => (
                <button key={value} type="button" onClick={() => onChange(value)}
                    className={`flex-1 text-xs h-7 px-2 rounded-md font-semibold transition-colors truncate ${
                        active === value
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );

    return (
        <div className="bg-card text-card-foreground rounded-xl border p-4 sm:p-6 shadow-sm flex flex-col gap-4 sm:gap-5" ref={rootRef}>

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div>
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight truncate min-w-0">
                        {t("title")}
                    </h3>

                    {/* ── Mobile filter button ── */}
                    <div className="sm:hidden relative shrink-0" ref={mobileRef}>
                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen((v) => !v)}
                            className="h-9 inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 text-xs font-semibold text-foreground shadow-sm hover:bg-accent transition-colors"
                        >
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            <span className="max-w-[120px] truncate">{intervalLabel} · {groupByLabel}</span>
                            <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
                        </button>

                        {mobileFiltersOpen && (
                            <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border bg-card shadow-xl z-50 p-4 space-y-4">
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t("metricCount")} / {t("metricVolume")}</p>
                                    <ToggleGroup options={METRIC_OPTIONS} active={metric} onChange={(v) => setMetric(v as ChartMetric)} />
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t("periodFilterLabel")}</p>
                                    <div className="grid grid-cols-3 gap-1">
                                        {INTERVAL_OPTIONS.map(({ value, label }) => (
                                            <button key={value} type="button"
                                                onClick={() => { setInterval(value); setMobileFiltersOpen(false); }}
                                                className={`text-xs h-7 px-2 rounded-md font-semibold border transition-colors truncate ${
                                                    interval === value
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background text-muted-foreground border-input hover:text-foreground"
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t("groupFilterLabel")}</p>
                                    <ToggleGroup options={GROUPBY_OPTIONS} active={groupBy} onChange={(v) => { setGroupBy(v as ChartGroupBy); setMobileFiltersOpen(false); }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Desktop: metric toggle + period dropdown + groupBy dropdown ── */}
                    <div className="hidden sm:flex flex-wrap items-center gap-2 shrink-0">
                        {/* Metric toggle */}
                        <div className="flex bg-muted/50 p-1 rounded-lg border">
                            {METRIC_OPTIONS.map(({ value, label }) => (
                                <button key={value} type="button" onClick={() => setMetric(value)}
                                    className={`text-xs h-7 px-3 rounded-md font-semibold transition-colors ${
                                        metric === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Period dropdown */}
                        <div className="relative">
                            <button type="button"
                                className="h-9 inline-flex items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-semibold text-foreground shadow-sm hover:bg-accent transition-colors"
                                onClick={() => { setPeriodMenuOpen((v) => !v); setGroupMenuOpen(false); }}
                            >
                                {intervalLabel}
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                            {periodMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-card shadow-lg z-50 overflow-hidden">
                                    {INTERVAL_OPTIONS.map((opt) => (
                                        <button key={opt.value} type="button"
                                            className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors ${
                                                interval === opt.value ? "text-primary" : "text-foreground"
                                            }`}
                                            onClick={() => { setInterval(opt.value); setPeriodMenuOpen(false); }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* GroupBy dropdown */}
                        <div className="relative">
                            <button type="button"
                                className="h-9 inline-flex items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-semibold text-foreground shadow-sm hover:bg-accent transition-colors"
                                onClick={() => { setGroupMenuOpen((v) => !v); setPeriodMenuOpen(false); }}
                            >
                                {groupByLabel}
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                            {groupMenuOpen && (
                                <div className="absolute right-0 mt-2 w-44 rounded-lg border bg-card shadow-lg z-50 overflow-hidden">
                                    {GROUPBY_OPTIONS.map((opt) => (
                                        <button key={opt.value} type="button"
                                            className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors ${
                                                groupBy === opt.value ? "text-primary" : "text-foreground"
                                            }`}
                                            onClick={() => { setGroupBy(opt.value); setGroupMenuOpen(false); }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {metric === "VOLUME" ? t("subtitleVolume") : t("subtitleCount")} · {intervalLabel} · {groupByLabel}
                </p>
            </div>

            {/* ── Chart ──────────────────────────────────────────────────── */}
            <MultiSeriesChart data={chartData} metric={metric} seriesLabels={seriesLabels} />

            {/* ── Legend ─────────────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 border-t">
                {chartData.series.map((s) => (
                    <div key={s.key} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                        {seriesLabels(s.key)}
                    </div>
                ))}
            </div>
        </div>
    );
}
