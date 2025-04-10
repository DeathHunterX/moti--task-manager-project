import { testimonialSectionData } from "@/data/homePageData";
import React from "react";
import TestimonialCard from "../card/TestimonialCard";

const TestimonialSection = () => {
    return (
        <section className="py-24 bg-[#f9fafb]">
            <div className="container mx-auto px-8 md:p-0">
                <div className="text-center mb-14">
                    <h2 className="text-4xl text-[#1e293b] mb-5">
                        Trusted by Thousands of Teams
                    </h2>
                    <p className="text-gray-500 max-w-[600px] mx-auto">
                        See what our customers have to say about Moti
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {testimonialSectionData.map((testimonial, idx) => (
                        <TestimonialCard
                            key={idx}
                            content={testimonial.content}
                            image={testimonial.authorImg}
                            name={testimonial.authorName}
                            position={testimonial.authorPosition}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
