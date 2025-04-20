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

export function generateInviteCode(length: number) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return result;
}

export const getCloudinaryPublicId = (url: string) =>
    url
        .split("/upload/")[1]
        .split("/")
        .slice(1)
        .join("/")
        .replace(/\.[^/.]+$/, "");

export function snakeCaseToTitleCase(str: string) {
    return str
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
