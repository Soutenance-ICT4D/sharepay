"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, ShieldCheck, Lock, SlidersHorizontal } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileHero } from "@/components/merchant/profile/profile-hero";
import { ProfileInformation } from "@/components/merchant/profile/profile-information";
import { ProfileKycSection } from "@/components/merchant/profile/profile-kyc-section";
import { ProfileSecurity } from "@/components/merchant/profile/profile-security";
import { ProfileDangerZone } from "@/components/merchant/profile/profile-danger-zone";
import { SettingsPreferences } from "@/components/merchant/settings/settings-preferences";

import { mockUserProfile, mockActiveSessions } from "@/lib/data/mock-profile";

const TABS = ["compte", "verification", "securite", "preferences"] as const;
type Tab = typeof TABS[number];

const TAB_ICONS: Record<Tab, React.ElementType> = {
    compte:       User,
    verification: ShieldCheck,
    securite:     Lock,
    preferences:  SlidersHorizontal,
};

export default function AccountPage() {
    const t            = useTranslations("Dashboard.Account");
    const searchParams = useSearchParams();
    const router       = useRouter();
    const pathname     = usePathname();

    const activeTab = (searchParams.get("tab") as Tab) ?? "compte";

    const setTab = (tab: Tab) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProfileHero user={mockUserProfile} />

            <Tabs value={activeTab} onValueChange={(v) => setTab(v as Tab)}>
                <TabsList className="flex w-full overflow-x-auto h-auto gap-1 p-1 bg-muted rounded-xl flex-wrap sm:flex-nowrap">
                    {TABS.map((tab) => {
                        const Icon = TAB_ICONS[tab];
                        return (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg flex-1 min-w-fit whitespace-nowrap"
                            >
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                {t(`tab_${tab}`)}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                <TabsContent value="compte" className="mt-6">
                    <ProfileInformation user={mockUserProfile} />
                </TabsContent>

                <TabsContent value="verification" className="mt-6">
                    <ProfileKycSection kyc={mockUserProfile.kyc} email={mockUserProfile.email} phone={mockUserProfile.phone} />
                </TabsContent>

                <TabsContent value="securite" className="mt-6 space-y-6">
                    <ProfileSecurity security={mockUserProfile.security} sessions={mockActiveSessions} />
                    <ProfileDangerZone />
                </TabsContent>

                <TabsContent value="preferences" className="mt-6">
                    <SettingsPreferences />
                </TabsContent>
            </Tabs>
        </div>
    );
}
