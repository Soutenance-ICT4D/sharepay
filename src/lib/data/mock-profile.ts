export interface UserProfileData {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    memberSince: string;
    isVerified: boolean;
    avatarUrl: string;
    security: {
        lastPasswordChange: string;
        twoFactorEnabled: boolean;
    };
}

export interface ActiveSession {
    id: string;
    device: string;
    browser: string;
    location: string;
    ipAddress: string;
    isCurrent: boolean;
    lastActive: string;
}

export const mockUserProfile: UserProfileData = {
    id: "USR-001",
    fullName: "DJINE SINTO PAFING",
    email: "dsintopafing@gmail.com",
    phone: "+237695242663",
    memberSince: "Janvier 2026",
    isVerified: true,
    avatarUrl: "/images/avatar.jpeg",
    security: {
        lastPasswordChange: "3 mois",
        twoFactorEnabled: true
    }
};

export const mockActiveSessions: ActiveSession[] = [
    {
        id: "SESS-001",
        device: "MacOS",
        browser: "Chrome",
        location: "Paris, France",
        ipAddress: "192.168.1.1",
        isCurrent: true,
        lastActive: "Maintenant"
    },
    {
        id: "SESS-002",
        device: "iPhone 14 Pro Max",
        browser: "Safari",
        location: "Lyon, France",
        ipAddress: "10.0.0.1",
        isCurrent: false,
        lastActive: "Il y a 2 heures"
    }
];
