import { pricingSectionData } from "@/data/homePageData";
import React from "react";
import PricingCard from "../card/PricingCard";

const PricingSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-8 md:p-0">
                <div className="text-center mb-14">
                    <h2 className="text-4xl text-[#1e293b] mb-5">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-500 max-w-[600px] mx-auto">
                        Choose the plan that fits your team's needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
                    {pricingSectionData.map((pricing, idx) => (
                        <PricingCard
                            key={idx}
                            name={pricing.name}
                            price={pricing.price}
                            mostPopular={pricing.mostPopular}
                            billing={pricing.billing}
                            features={pricing.features}
                            cta={pricing.cta}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
