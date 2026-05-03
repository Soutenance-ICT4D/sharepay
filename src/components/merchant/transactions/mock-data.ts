export type TxStatus = "SUCCESS" | "PENDING" | "FAILED" | "CANCELLED" | "REFUNDED";
export type TxType = "PAYMENT" | "PAYOUT";
export type TxProvider = "MTN" | "ORANGE";
export type TxSource = "PAYMENT_LINK" | "APP_INTEGRATION";

export interface MockTransaction {
    id: string;
    reference: string;
    type: TxType;
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    provider: TxProvider;
    providerRef: string;
    amount: number;
    fees: number;
    net: number;
    currency: "XAF";
    status: TxStatus;
    appName: string;
    appId: string;
    source: TxSource;
    createdAt: string;
    updatedAt: string;
}

const BASE_DATE = new Date("2026-05-03T12:00:00.000Z");

const CLIENTS: { name: string; email?: string }[] = [
    { name: "Kouassi Jean",      email: "kouassi.jean@gmail.com" },
    { name: "Diabaté Fatou",     email: "diabate.fatou@gmail.com" },
    { name: "N'Guessan Pierre" },
    { name: "Konaté Aissatou",   email: "konate.aissatou@yahoo.fr" },
    { name: "Traoré Mamadou" },
    { name: "Bamba Adja",        email: "bamba.adja@gmail.com" },
    { name: "Coulibaly Seydou" },
    { name: "Diallo Aminata",    email: "diallo.aminata@gmail.com" },
    { name: "Keita Boubacar" },
    { name: "Touré Mariama",     email: "toure.mariama@yahoo.fr" },
];

const MTN_PHONES    = ["+237 671 234 567", "+237 679 876 543", "+237 671 112 233", "+237 677 654 321", "+237 671 445 566"];
const ORANGE_PHONES = ["+237 694 567 890", "+237 692 345 678", "+237 699 112 233", "+237 695 443 221", "+237 698 776 655"];

const APPS = [
    { id: "app_001", name: "E-commerce Principal" },
    { id: "app_002", name: "Système de réservation" },
    { id: "app_003", name: "Abonnements Premium" },
];

const AMOUNTS: number[] = [1_000, 2_500, 5_000, 7_500, 10_000, 15_000, 25_000, 50_000, 75_000, 100_000];

const STATUSES: TxStatus[] = [
    "SUCCESS", "SUCCESS", "SUCCESS", "SUCCESS", "SUCCESS",
    "SUCCESS", "SUCCESS", "PENDING", "PENDING", "FAILED",
    "FAILED",  "FAILED",  "CANCELLED", "REFUNDED",
];

const PROVIDERS: TxProvider[] = ["MTN", "ORANGE", "MTN", "MTN", "ORANGE"];
const SOURCES: TxSource[]     = ["APP_INTEGRATION", "PAYMENT_LINK", "APP_INTEGRATION"];

function makeTx(i: number): MockTransaction {
    const daysAgo   = i % 15;
    const hoursAgo  = (i * 3) % 24;
    const minsAgo   = (i * 7) % 60;
    const createdAt = new Date(
        BASE_DATE.getTime() - daysAgo * 86_400_000 - hoursAgo * 3_600_000 - minsAgo * 60_000
    );
    const updatedAt = new Date(createdAt.getTime() + ((i % 4) + 1) * 300_000);

    const amount   = AMOUNTS[i % AMOUNTS.length];
    const status   = STATUSES[i % STATUSES.length];
    const provider = PROVIDERS[i % PROVIDERS.length];
    const client   = CLIENTS[i % CLIENTS.length];
    const app      = APPS[i % APPS.length];
    const source   = SOURCES[i % SOURCES.length];

    const fees = status === "SUCCESS" ? Math.round(amount * 0.015) : 0;

    return {
        id:          `tx_${String(i + 1).padStart(3, "0")}_${createdAt.getTime().toString(36)}`,
        reference:   `TXN-2026-${String(10_000 + i).padStart(5, "0")}`,
        type:        i % 8 === 7 ? "PAYOUT" : "PAYMENT",
        clientName:  client.name,
        clientPhone: (provider === "MTN" ? MTN_PHONES : ORANGE_PHONES)[i % 5],
        clientEmail: client.email,
        provider,
        providerRef: `${provider === "MTN" ? "MTN" : "OM"}${String(200_000_000 + i * 173).padStart(12, "0")}`,
        amount,
        fees,
        net:      status === "SUCCESS" ? amount - fees : 0,
        currency: "XAF",
        status,
        appName:  app.name,
        appId:    app.id,
        source,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
    };
}

export const MOCK_TRANSACTIONS: MockTransaction[] = Array.from({ length: 50 }, (_, i) => makeTx(i));
