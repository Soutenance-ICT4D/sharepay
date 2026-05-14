export type AccountStatus = "PENDING_VERIFICATION" | "ACTIVE" | "SUSPENDED" | "INACTIVE" | "DELETED";
export type KycLevel      = "NONE" | "BASIC" | "ADVANCED" | "FULL";
export type AuthProvider  = "LOCAL" | "GOOGLE" | "GITHUB";
export type Role          = "MERCHANT" | "ADMIN" | "SUPPORT";

export interface MerchantProfile {
    id:            string;
    fullName:      string;
    email:         string;
    phone:         string | null;
    country:       string | null;
    avatarUrl:     string | null;
    role:          Role;
    status:        AccountStatus;
    kycLevel:      KycLevel;
    provider:      AuthProvider;
    emailVerified: boolean;
    phoneVerified: boolean;
    createdAt:     string;
    updatedAt:     string;
}

export interface UpdateProfileRequest {
    fullName?:  string;
    phone?:     string;
    country?:   string;
    avatarUrl?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword:     string;
}
