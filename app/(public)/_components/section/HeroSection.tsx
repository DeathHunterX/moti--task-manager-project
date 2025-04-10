import FloatingBubble from "@/components/shared/animated/FloatingBubble";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
    const generateRandomBubbles = (count = 8) => {
        return Array.from({ length: count }, (_, i) => {
            const size = Math.floor(Math.random() * 60) + 40; // 40px to 100px
            const top = `${Math.floor(Math.random() * 80)}%`;
            const left = `${Math.floor(Math.random() * 80)}%`;
            const duration = `${Math.floor(Math.random() * 10 + 15)}s`;
            const delay = `${Math.random().toFixed(2)}s`;

            return (
                <FloatingBubble
                    key={i}
                    size={size}
                    top={top}
                    left={left}
                    duration={duration}
                    delay={delay}
                />
            );
        });
    };
    return (
        <section className="bg-[linear-gradient(135deg,_#4A6CF7_0%,_#7e90f9_100%)] relative overflow-hidden py-20">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0]">
                {generateRandomBubbles(12)}
            </div>
            <div className="container mx-auto px-8 md:p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="">
                        <h1 className="text-5xl text-center text-balance mb-6 font-bold capitalize text-white">
                            Stay on track, get thing done
                        </h1>
                        <p className="text-lg mb-8 opacity-90 max-w-xl text-white">
                            Moti helps you stay organized, focused, and in
                            control of your day. From simple to-dos to long-term
                            goals, our intuitive task manager keeps your
                            priorities clear and your motivation high — so you
                            can make meaningful progress, one step at a time.
                        </p>
                        <div className="max-w-40">
                            <Link
                                href="/sign-in"
                                className="px-[30px] py-[14px] text-base font-semibold rounded-[8px] 
                                    flex items-center justify-center hover:-translate-y-1 transition-transform duration-300
                                    bg-white text-blue-600 border border-blue-600
                                    hover:bg-blue-50 hover:shadow-[0_8px_15px_rgba(0,0,0,0.1)]"
                            >
                                Get Started
                            </Link>
                        </div>
                        <div className="flex flex-row mt-10 gap-7 text-white">
                            <div className="text-center">
                                <div className="text-[28px] font-bold mb-1.5">
                                    98%
                                </div>
                                <div className="text-sm opacity-80">
                                    Customer Satisfaction
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-[28px] font-bold mb-1.5">
                                    10K+
                                </div>
                                <div className="text-sm opacity-80">
                                    Teams Using TaskFlow
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-[28px] font-bold mb-1.5">
                                    35%
                                </div>
                                <div className="text-sm opacity-80">
                                    Average Productivity Gain
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="/test.png"
                            width={600}
                            height={400}
                            alt="Moti Dashboard in Action"
                            className="w-full rounded-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] 
                                transform perspective-[1000px] rotate-y-[-5deg] rotate-x-[5deg] 
                                transition-all duration-500 ease-in-out hover:rotate-y-0 hover:rotate-x-0"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
