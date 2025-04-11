import { Fragment } from "react";
import HeroSection from "./_components/section/HeroSection";
import FeatureSection from "./_components/section/FeatureSection";
import TestimonialSection from "./_components/section/TestimonialSection";
import PricingSection from "./_components/section/PricingSection";
import CTASection from "./_components/section/CTASection";

export default function Home() {
    return (
        <Fragment>
            <HeroSection />
            <FeatureSection />
            <TestimonialSection />
            <PricingSection />
            <CTASection />
        </Fragment>
    );
}
