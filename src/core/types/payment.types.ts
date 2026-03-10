// Merchant information is now inlined directly into related interfaces

export interface PaymentLinkInfo {
    id: string;
    title: string;
    description: string;
    logoUrl?: string;
    amount: number;
    currency: string;
    currencyName: string;
    type: 'FIXED' | 'FREE';
    collectCustomerInfo: boolean;
    status: 'ACTIVE' | 'EXPIRED' | 'COMPLETED';
    callbackUrl?: string;
    createdAt: string;
    expiresAt?: string;
}

export interface CheckoutSessionInfo {
    id: string;
    reference: string;
    title: string;
    description: string;
    logoUrl?: string;
    type: string;
    amount: number;
    currency: string;
    currencyName: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED';
    callbackUrl?: string;
    createdAt: string;
    expiresAt: string;
    // Optional pre-fill data
    phoneNumber?: string;
    paymentMethod?: PaymentMethodType;
    fullName?: string;
    email?: string;
    collectCustomerInfo?: boolean;
}

export type PaymentMethodType = 'ORANGE_MONEY' | 'MTN_MONEY';

export interface PaymentProcessRequest {
    id: string; // payment link id or checkout session code
    type: 'LINK' | 'CHECKOUT';
    paymentMethod: PaymentMethodType;
    phoneNumber?: string; // For Mobile Money
    cardNumber?: string;  // For Bank Card
    cardExpiry?: string;
    cardCvv?: string;
    amount?: number;
    fullName?: string;
    email?: string;
}

export interface PaymentProcessResponse {
    success: boolean;
    transactionId?: string;
    message: string;
}
