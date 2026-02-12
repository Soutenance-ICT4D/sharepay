import { ReactNode } from "react";

// Types
export type DateRangePreset = "today" | "last7" | "last30" | "custom";

export interface OverviewTransactionPoint {
    date: Date;
    label: string;
    volume: number;
    count: number;
}

export interface OverviewStat {
    label: string;
    value: string;
    badge?: {
        label: string;
        className: string;
    };
    icon: ReactNode;
    iconWrapClassName?: string;
    progress?: {
        value: number;
        className: string;
    };
}

export interface OverviewActivityItem {
    id: string;
    title: string;
    meta: string;
    amount: string;
    status: string;
    amountClassName?: string;
    statusClassName?: string;
    icon: ReactNode;
    iconWrapClassName?: string;
}

// Helpers
function formatShortDate(value: Date) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
    }).format(value);
}

function formatHour(value: Date) {
    return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(value);
}

function formatShortDateTime(value: Date) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(value);
}

function daysBetween(from: Date, to: Date) {
    const ms = to.getTime() - from.getTime();
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

// Data Logic
export function buildSeries({
    preset,
    from,
    to,
}: {
    preset: DateRangePreset;
    from?: string;
    to?: string;
}): OverviewTransactionPoint[] {
    const now = new Date();
    // Reset to end of today effectively for simulation
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let start = end;
    if (preset === "last7") {
        start = new Date(end);
        start.setDate(start.getDate() - 6);
    } else if (preset === "last30") {
        start = new Date(end);
        start.setDate(start.getDate() - 29);
    } else {
        const parsedFrom = from ? new Date(from) : undefined;
        const parsedTo = to ? new Date(to) : undefined;
        const safeFrom = parsedFrom && !Number.isNaN(parsedFrom.getTime()) ? parsedFrom : end;
        const safeTo = parsedTo && !Number.isNaN(parsedTo.getTime()) ? parsedTo : end;
        start = safeFrom;

        start.setHours(0, 0, 0, 0);
        const clampedEnd = safeTo;
        clampedEnd.setHours(0, 0, 0, 0);
        if (clampedEnd.getTime() < start.getTime()) {
            start = clampedEnd;
        }
        (end as Date).setTime(clampedEnd.getTime());
    }

    const points: OverviewTransactionPoint[] = [];

    if (preset === "today") {
        const hourEnd = new Date(now);
        hourEnd.setMinutes(0, 0, 0);
        const startOfDay = new Date(end);
        startOfDay.setHours(0, 0, 0, 0);

        const hours = Math.max(1, Math.min(24, hourEnd.getHours() + 1));
        for (let i = 0; i < hours; i += 1) {
            const d = new Date(startOfDay);
            d.setHours(i, 0, 0, 0);

            const seed = (d.getHours() * 7 + d.getDate()) % 17;
            const base = 260000; // XAF Scale
            const swing = 0.7 + seed / 22;
            const volume = Math.round(base * swing + (i % 6) * 55000);
            const count = Math.max(1, Math.round(volume / 3500 + (seed % 3)));

            points.push({
                date: d,
                label: formatHour(d),
                volume,
                count,
            });
        }
    } else {
        const totalDays = daysBetween(start, end) + 1;
        const shouldUseSubDaily = preset === "last7";

        const isCustom = preset === "custom";
        const customDays = isCustom ? totalDays : totalDays;
        const customGranularity: "daily" | "quad" | "hourly" = !isCustom
            ? shouldUseSubDaily
                ? "quad"
                : "daily"
            : customDays <= 2
                ? "hourly"
                : customDays <= 14
                    ? "quad"
                    : "daily";

        if (customGranularity === "hourly") {
            const startOfRange = new Date(start);
            startOfRange.setHours(0, 0, 0, 0);
            const endOfRange = new Date(end);
            endOfRange.setHours(23, 0, 0, 0);

            const totalHours = Math.max(1, Math.round((endOfRange.getTime() - startOfRange.getTime()) / (1000 * 60 * 60)) + 1);
            for (let i = 0; i < totalHours; i += 1) {
                const d = new Date(startOfRange);
                d.setHours(startOfRange.getHours() + i, 0, 0, 0);

                const seed = (d.getHours() * 7 + d.getDate()) % 17;
                const base = 240000; // XAF
                const swing = 0.7 + seed / 22;
                const volume = Math.round(base * swing + (i % 6) * 45000);
                const count = Math.max(1, Math.round(volume / 3500 + (seed % 3)));

                points.push({
                    date: d,
                    label: formatShortDateTime(d),
                    volume,
                    count,
                });
            }
        } else if (customGranularity === "quad") {
            const hourMarks = [3, 9, 15, 21];
            for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
                for (let h = 0; h < hourMarks.length; h += 1) {
                    const d = new Date(start);
                    d.setDate(start.getDate() + dayIndex);
                    d.setHours(hourMarks[h], 0, 0, 0);

                    const seed = (d.getHours() * 7 + d.getDate()) % 17;
                    const base = preset === "last30" ? 950000 : preset === "last7" ? 700000 : 520000;
                    const swing = 0.65 + seed / 20;
                    const volume = Math.round(base * swing + (h % 3) * 80000 + (dayIndex % 5) * 35000);
                    const count = Math.max(1, Math.round(volume / 9000 + (seed % 4)));

                    points.push({
                        date: d,
                        label: dayIndex === totalDays - 1 && h === hourMarks.length - 1 ? formatShortDate(d) : formatShortDateTime(d),
                        volume,
                        count,
                    });
                }
            }
        } else {
            for (let i = 0; i < totalDays; i += 1) {
                const d = new Date(start);
                d.setDate(start.getDate() + i);

                const seed = (d.getDate() + (d.getMonth() + 1) * 13) % 17;
                const base = preset === "last30" ? 4200000 : preset === "last7" ? 2600000 : 1800000;
                const swing = 0.65 + seed / 20;
                const volume = Math.round(base * swing + (i % 5) * 180000);
                const count = Math.max(1, Math.round(volume / 16000 + (seed % 4)));

                points.push({
                    date: d,
                    label: formatShortDate(d),
                    volume,
                    count,
                });
            }
        }
    }

    return points;
}
