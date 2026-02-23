"use client";

import { ProfileHero } from "@/components/dashboard/profile/profile-hero";
import { ProfileInformation } from "@/components/dashboard/profile/profile-information";
import { ProfileSecurity } from "@/components/dashboard/profile/profile-security";
import { ProfileDangerZone } from "@/components/dashboard/profile/profile-danger-zone";
import { mockUserProfile, mockActiveSessions } from "@/lib/data/mock-profile";

export default function ProfilePage() {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProfileHero user={mockUserProfile} />
                <ProfileInformation user={mockUserProfile} />
                <ProfileSecurity security={mockUserProfile.security} sessions={mockActiveSessions} />
                <ProfileDangerZone />
            </div>
        </div>
    );
}
