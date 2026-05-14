"use client";

import { useEffect, useState } from "react";
import { accountService } from "@/lib/services/account.service";
import { MerchantProfile } from "@/lib/types/account.types";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileHero } from "@/components/merchant/profile/profile-hero";
import { ProfileInformation } from "@/components/merchant/profile/profile-information";
import { ProfileKycSection } from "@/components/merchant/profile/profile-kyc-section";
import { ProfileSecurity } from "@/components/merchant/profile/profile-security";
import { ProfileDangerZone } from "@/components/merchant/profile/profile-danger-zone";

export default function AccountPage() {
    const [profile, setProfile] = useState<MerchantProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        accountService.getProfile()
            .then(setProfile)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-6 pb-8 border-b border-border">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-xl" />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <ProfileHero profile={profile} onProfileUpdate={setProfile} />
            <ProfileInformation profile={profile} onProfileUpdate={setProfile} />
            <ProfileKycSection
                email={profile.email}
                phone={profile.phone ?? ""}
                emailVerified={profile.emailVerified}
                phoneVerified={profile.phoneVerified}
            />
            <ProfileSecurity isOAuth={profile.provider !== "LOCAL"} />
            <ProfileDangerZone />
        </div>
    );
}
