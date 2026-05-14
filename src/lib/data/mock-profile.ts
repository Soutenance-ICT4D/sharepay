export interface UserProfileData {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    memberSince: string;
    isVerified: boolean;
    avatarUrl: string;
    business: {
        companyName: string;
        entityType: "individual" | "company";
        sector: string;
        website: string;
        address: string;
        city: string;
        country: string;
    };
    kyc: {
        status: "not_started" | "pending" | "verified" | "rejected";
        rejectionReason?: string;
        submittedAt?: string;
        verifiedAt?: string;
        documents: KycDocument[];
    };
    security: {
        lastPasswordChange: string;
        twoFactorEnabled: boolean;
    };
}

export interface KycDocument {
    id: string;
    type: "id_card";
    status: "missing" | "uploaded" | "approved" | "rejected";
    rejectionReason?: string;
    uploadedAt?: string;
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
    business: {
        companyName: "SharePay Technologies SARL",
        entityType: "company",
        sector: "Fintech / Paiements digitaux",
        website: "https://sharepay.cm",
        address: "Boulevard de la Liberté, Akwa",
        city: "Douala",
        country: "Cameroun",
    },
    kyc: {
        status: "verified",
        submittedAt: "15 Jan 2026",
        verifiedAt: "18 Jan 2026",
        documents: [
            { id: "DOC-001", type: "id_card", status: "approved", uploadedAt: "15 Jan 2026" },
        ],
    },
    security: {
        lastPasswordChange: "3 mois",
        twoFactorEnabled: true,
    },
};

export const mockActiveSessions: ActiveSession[] = [
    {
        id: "SESS-001",
        device: "MacOS",
        browser: "Chrome",
        location: "Douala, Cameroun",
        ipAddress: "197.255.10.14",
        isCurrent: true,
        lastActive: "Maintenant",
    },
    {
        id: "SESS-002",
        device: "iPhone 14 Pro Max",
        browser: "Safari",
        location: "Yaoundé, Cameroun",
        ipAddress: "197.255.20.8",
        isCurrent: false,
        lastActive: "Il y a 2 heures",
    },
];

