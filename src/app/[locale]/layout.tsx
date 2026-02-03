import type { Metadata } from "next";
import "../globals.css";
import { cn } from "../../core/lib/utils";
import { ThemeProvider } from "../../components/providers/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../core/i18n/routing';
import NextTopLoader from 'nextjs-toploader';
import { cookies } from 'next/headers';
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "SharePay",
    description: "Unified Payment Aggregator",
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function RootLayout({
    children,
    params
}: Props) {
    const { locale } = await params;

    // Type assertion to readonly string[] to match includes signature if needed, 
    // but usually string[] is fine. routing.locales is readonly ['en', 'fr'].
    const locales = routing.locales as readonly string[];

    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages();

    // 2. LECTURE DU COOKIE CÔTÉ SERVEUR
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get("theme");
    const theme = themeCookie?.value || "system";

    // Si le cookie dit "dark", on force la classe immédiatement
    const themeClass = theme === "dark" ? "dark" : "";

    return (
        // 3. INJECTION DE LA CLASSE (Plus de flash blanc !)
        <html lang={locale} className={themeClass} suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans text-foreground antialiased",
                )}
            >
                <NextTopLoader
                    color="#098865"
                    showSpinner={false}
                    shadow="0 0 10px #098865,0 0 5px #098865"
                />

                <NextIntlClientProvider messages={messages} locale={locale} key={locale}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster richColors position="top-center" />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
