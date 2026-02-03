"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { LoaderPage } from "@/components/shared/loader-page";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const t = useTranslations("HomePage");
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoader = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  if (isLoading) {
    return <LoaderPage label={t('testConfig.loaderLabel')} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground gap-8 transition-colors duration-300">

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow">
          <h2 className="text-xl font-semibold mb-2">{t('testConfig.themeTitle')}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {t('testConfig.themeDesc')}
          </p>
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>

        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow">
          <h2 className="text-xl font-semibold mb-2">{t('testConfig.langTitle')}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {t('testConfig.langDesc')}
          </p>
          <div className="flex justify-center h-10">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border bg-card text-card-foreground shadow w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold mb-2">{t('testConfig.loaderTitle')}</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t('testConfig.loaderDesc')}
        </p>
        <Button onClick={triggerLoader} size="lg">
          {t('testConfig.loaderBtn')}
        </Button>
      </div>

    </main>
  );
}
