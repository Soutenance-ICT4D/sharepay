export type StaffRole = "ADMIN" | "SUPPORT";
export type AccountStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";

export interface StaffResponse {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    role: StaffRole;
    status: AccountStatus;
    createdAt: string;
}

export interface PaginationResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface CreateStaffRequest {
    fullName: string;
    email: string;
    password: string;
    role: StaffRole;
    phone?: string;
}

export interface UpdateStatusRequest {
    status: AccountStatus;
}
