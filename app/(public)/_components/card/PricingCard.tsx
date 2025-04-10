import { cn, formatPercentage } from "@/lib/utils";
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
                "bg-white rounded-xl p-8 shadow-lg border border-transparent hover:shadow-lg hover:-translate-y-3 transition-transform duration-300 text-center",
                mostPopular
                    ? "border-[#4A6CF7] relative transform scale-105 before:content-['Most Popular']"
                    : ""
            )}
        >
            <h3 className="text-2xl mb-5 text-[#1e293b]">{name}</h3>
            <p className="text-5xl font-bold text-[#1e293b] mb-5">
                {formatPercentage(price, { addPrefix: true })}
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
                        ? "bg-[#4A6CF7] text-white"
                        : "border border-[#4A6CF7]"
                )}
            >
                {cta}
            </Link>
        </div>
    );
};

export default PricingCard;
