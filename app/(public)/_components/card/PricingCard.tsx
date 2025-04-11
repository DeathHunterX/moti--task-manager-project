import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface PricingCardProps {
    name: string;
    price: number;
    mostPopular: boolean;
    billing: string;
    features: string[];
    cta: string;
}

const PricingCard = ({
    name,
    price,
    mostPopular,
    billing,
    features,
    cta,
}: PricingCardProps) => {
    return (
        <div
            className={cn(
                `bg-white rounded-xl p-8 shadow-md border border-transparent text-center mx-auto max-w-sm md:max-w-none
                w-full hover:shadow-xl hover:-translate-y-3 transition-transform duration-300`,
                mostPopular
                    ? "border-[#4A6CF7] relative transform scale-105 before:content-['Most_Popular'] before:absolute before:top-0 before:left-1/2 before:-translate-1/2 before:bg-[#4A6CF7] before:text-white before:py-1.5 before:px-4 before:rounded-[20px] before:text-sm before:font-medium"
                    : ""
            )}
        >
            <h3 className="text-2xl mb-5 text-[#1e293b]">{name}</h3>
            <p className="text-5xl font-bold text-[#1e293b] mb-5">
                {formatCurrency(price)}
                <span className="text-base font-normal text-[#64748b]">
                    {billing}
                </span>
            </p>
            <ul className="mb-7">
                {features.map((feature, idx) => (
                    <li
                        key={idx}
                        className="py-2.5 not-last:border-b border-b-[#e2e8f0] text-[#64748b]"
                    >
                        {feature}
                    </li>
                ))}
            </ul>
            <Link
                href="#"
                className={cn(
                    "px-6 py-2.5 rounded-sm font-medium",
                    mostPopular
                        ? "bg-[#4A6CF7] text-white hover:bg-[#3755d8]"
                        : "border-2 border-[#4A6CF7] bg-white text-[#4A6CF7] hover:bg-[#4A6CF7] hover:text-white"
                )}
            >
                {cta}
            </Link>
        </div>
    );
};

export default PricingCard;
