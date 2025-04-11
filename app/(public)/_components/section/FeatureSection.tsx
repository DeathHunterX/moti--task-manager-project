import { featuresSectionData } from "@/data/homePageData";
import React from "react";
import FeatureCard from "../card/FeatureCard";

const FeatureSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-8 md:px-4">
                <div className="text-center mb-14">
                    <h2 className="text-4xl text-[#1e293b] mb-5">
                        Everything You Need to Stay Organized
                    </h2>
                    <p className="text-gray-500 max-w-[600px] mx-auto">
                        Powerful features to help you manage tasks, projects and
                        teams with ease
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuresSectionData.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            icon={React.cloneElement(feature.icon, {
                                className: "size-8 text-blue-500",
                            })}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
