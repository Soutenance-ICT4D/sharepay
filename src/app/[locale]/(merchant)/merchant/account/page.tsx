"use client";

import { useEffect, useState } from "react";
import { accountService } from "@/lib/services/account.service";
import { MerchantProfile } from "@/lib/types/account.types";
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

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <ProfileHero
                profile={profile}
                isLoading={loading}
                onProfileUpdate={setProfile}
            />
            <ProfileInformation
                profile={profile}
                isLoading={loading}
                onProfileUpdate={setProfile}
            />
            <ProfileKycSection
                email={profile?.email}
                phone={profile?.phone ?? ""}
                emailVerified={profile?.emailVerified}
                phoneVerified={profile?.phoneVerified}
                isLoading={loading}
            />
            <ProfileSecurity
                isOAuth={profile?.provider !== "LOCAL"}
                isLoading={loading}
            />
            <ProfileDangerZone />
        </div>
    );
}
