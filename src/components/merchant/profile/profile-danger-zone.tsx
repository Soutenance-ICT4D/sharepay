import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function ProfileDangerZone() {
    const t = useTranslations('Dashboard.Profile.DangerZone');

    return (
        <section className="pt-6">
            <div className="p-6 rounded-xl border border-destructive/30 bg-destructive/10">
                <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="text-destructive w-6 h-6" />
                    <h4 className="text-destructive font-bold text-lg">{t('title')}</h4>
                </div>
                <p className="text-sm text-destructive/80 mb-4 font-medium">{t('warning')}</p>
                <Button variant="destructive" className="font-bold rounded-xl shadow-md">{t('deleteAccount')}</Button>
            </div>
        </section>
    );
}
