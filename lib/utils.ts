import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPercentage(
    value: number,
    options: { addPrefix?: boolean } = { addPrefix: false }
) {
    const result = new Intl.NumberFormat("en-US", {
        style: "percent",
    }).format(value / 100);

    if (options.addPrefix && value > 0) {
        return `+${result}`;
    }

    return result;
}

export function formatCurrency(value: number) {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  }
