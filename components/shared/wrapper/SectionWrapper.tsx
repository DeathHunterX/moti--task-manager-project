import React from "react";

interface SectionWrapperProps {
    title: string;
    children: React.ReactNode;
}

const SectionWrapper = ({ title, children }: SectionWrapperProps) => {
    return <div>SectionWrapper</div>;
};

export default SectionWrapper;
