"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${checked ? "bg-primary" : "bg-muted"}`}
        >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
        </button>
    );
}

export function SettingsPreferences() {
    const t              = useTranslations("Dashboard.Settings.Preferences");
    const locale         = useLocale();
    const { theme, resolvedTheme, setTheme } = useTheme();

    const [language,       setLanguage]       = useState(locale);
    const [notifEnabled,   setNotifEnabled]   = useState(true);

    const currentTheme = theme === "system" ? resolvedTheme : theme;

    const selectTheme = (val: "light" | "dark") => {
        setTheme(val);
        document.cookie = `theme=${val}; path=/; max-age=31536000`;
    };

    return (
        <section>
            <div className="bg-card rounded-xl border border-border shadow-sm divide-y divide-border">

                {/* Language */}
                <div className="px-6 py-5 space-y-3">
                    <p className="text-sm font-semibold">{t("language")}</p>
                    <div className="grid grid-cols-2 gap-3">
                        {(["fr", "en"] as const).map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setLanguage(lang)}
                                className={`rounded-xl border-2 px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                    language === lang
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
                                }`}
                            >
                                <p className="font-bold text-sm">{lang === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme */}
                <div className="px-6 py-5 space-y-3">
                    <p className="text-sm font-semibold">{t("theme")}</p>
                    <div className="grid grid-cols-2 gap-3">
                        {(["light", "dark"] as const).map((val) => {
                            const Icon    = val === "light" ? Sun : Moon;
                            const isActive = currentTheme === val;
                            return (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => selectTheme(val)}
                                    className={`flex items-center gap-2.5 rounded-xl border-2 px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                        isActive
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
                                    }`}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <p className="font-bold text-sm">{t(val === "light" ? "themeLight" : "themeDark")}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Notifications */}
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div>
                            <p className="text-sm font-semibold">{t("notifications")}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{t("notificationsDesc")}</p>
                        </div>
                    </div>
                    <Toggle checked={notifEnabled} onChange={setNotifEnabled} />
                </div>

            </div>
        </section>
    );
}
