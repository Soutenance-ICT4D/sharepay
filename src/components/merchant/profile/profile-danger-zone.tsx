import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function ProfileDangerZone() {
    const t = useTranslations('Dashboard.Profile.DangerZone');

    return (
        <section className="pt-6">
            <div className="p-6 rounded-xl border border-destructive/30 bg-destructive/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <AlertTriangle className="text-destructive w-5 h-5 shrink-0" />
                        <h4 className="text-destructive font-bold text-base">{t('title')}</h4>
                    </div>
                    <p className="text-sm text-destructive/80 font-medium">{t('warning')}</p>
                </div>
                <Button variant="destructive" className="font-bold rounded-xl shadow-md shrink-0">{t('deleteAccount')}</Button>
            </div>
        </section>
    );
}
