"use client";

import { ProfileHero } from "@/components/merchant/profile/profile-hero";
import { ProfileInformation } from "@/components/merchant/profile/profile-information";
import { ProfileSecurity } from "@/components/merchant/profile/profile-security";
import { ProfileDangerZone } from "@/components/merchant/profile/profile-danger-zone";
import { mockUserProfile, mockActiveSessions } from "@/lib/data/mock-profile";

export default function ProfilePage() {
    return (
        <div>
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProfileHero user={mockUserProfile} />
                <ProfileInformation user={mockUserProfile} />
                <ProfileSecurity security={mockUserProfile.security} sessions={mockActiveSessions} />
                <ProfileDangerZone />
            </div>
        </div>
    );
}
