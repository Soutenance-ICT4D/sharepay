import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string, locale: string = 'fr-FR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

/**
 * Custom formatter that matches SharePay UI style
 * Places currency name BEFORE amount and uses localized separators
 */
export function formatAmount(amount: number, currencyName: string, locale: string = 'fr') {
  const isFr = locale.startsWith('fr');
  const thousandSeparator = isFr ? " " : ",";
  const decimalSeparator = isFr ? "," : ".";

  const parts = amount.toFixed(2).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  const decPart = parts[1];

  const formattedAmount = decPart === "00" ? intPart : `${intPart}${decimalSeparator}${decPart}`;

  if (currencyName == '$') {
    return `${currencyName} ${formattedAmount}`;
  }

  return `${formattedAmount} ${currencyName}`;
}
