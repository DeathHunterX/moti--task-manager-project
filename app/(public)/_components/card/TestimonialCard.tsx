import Image from "next/image";
import React from "react";

interface TestimonialCardProps {
    content: string;
    image: string;
    name: string;
    position: string;
}

const TestimonialCard = ({
    content,
    image,
    name,
    position,
}: TestimonialCardProps) => {
    return (
        <div className="bg-white rounded-xl p-[30px] shadow-lg">
            <p className="mb-5 text-[#64748b] italic">{content}</p>
            <div className="flex flex-row items-center">
                <Image
                    src={image || ""}
                    width={100}
                    height={100}
                    alt={name}
                    className="size-16 rounded-full object-cover overflow-hidden mr-4"
                />

                <div className="">
                    <h4 className="mb-1.5 text-[#1e293b]">{name}</h4>
                    <p className="text-[#64748b] text-sm">{position}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
