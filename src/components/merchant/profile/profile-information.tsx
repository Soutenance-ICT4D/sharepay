import { useState } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { UserProfileData } from "@/lib/data/mock-profile";
import { PhoneInput } from "@/components/ui/phone-input";

interface ProfileInformationProps {
    user: UserProfileData;
}

export function ProfileInformation({ user }: ProfileInformationProps) {
    const t = useTranslations('Dashboard.Profile.Information');
    const [fullName, setFullName] = useState(user.fullName);
    const [phone, setPhone] = useState(user.phone);

    const hasChanges = fullName !== user.fullName || phone !== user.phone;

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <UserCircle className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t('title')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-muted-foreground">{t('fullName')}</label>
                    <input
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">{t('email')}</label>
                    <input className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground outline-none cursor-not-allowed" type="email" defaultValue={user.email} disabled />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">{t('phone')}</label>
                    <PhoneInput value={phone} onChange={setPhone} className="w-full" />
                </div>
                <div className="md:col-span-2 flex justify-end mt-2">
                    <Button
                        className="font-bold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!hasChanges}
                    >
                        {t('save')}
                    </Button>
                </div>
            </div>
        </section>
    );
}
