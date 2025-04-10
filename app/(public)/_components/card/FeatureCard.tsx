import { LucideIcon } from "lucide-react";
import React from "react";

interface FeatureCardProps {
    icon: SVGAElement | LucideIcon | Element | React.ReactElement;
    title: string;
    description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
        <div className="text-center p-[30px] border rounded-xl bg-white shadow-md hover:shadow-lg hover:-translate-y-3 transition-transform duration-300">
            <div className="size-16 bg-[#eef2ff] rounded-full flex flex-row justify-center items-center mb-6 mx-auto">
                <div className="text-[#4A6CF7]">
                    {React.isValidElement(icon)
                        ? icon
                        : React.createElement(icon as React.ElementType)}
                </div>
            </div>
            <h3 className="text-xl mb-3.5 text-[#1e293b]">{title}</h3>
            <p className="text-[#64748b]">{description}</p>
        </div>
    );
};

export default FeatureCard;
