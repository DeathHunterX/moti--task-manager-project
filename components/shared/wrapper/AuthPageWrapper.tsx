import Image from "next/image";
import React from "react";

interface AuthLayoutProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

const AuthPageWrapper = ({ title, description, children }: AuthLayoutProps) => {
    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="hidden h-full flex-col justify-between bg-blue-400 p-8 lg:flex">
                <div className="">
                    <Image
                        src="/logo.png"
                        width={150}
                        height={150}
                        alt="logo"
                        className="bg-white"
                    />
                    <div className="mt-8 text-white">
                        <h1 className="text-3xl">Get started with Moti</h1>
                        <p className="text-lg">Your productivity hub awaits.</p>
                    </div>
                </div>
                <div className="flex justify-end -mr-8 h-[60vh]">
                    <Image
                        src="/test.png"
                        width={600}
                        height={400}
                        alt="product"
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="h-full flex-col items-center justify-center px-4 lg:flex">
                <div className="space-y-4 pt-8 text-center">
                    <h1 className="text-3xl font-bold text-[#2E2A47]">
                        {title}
                    </h1>
                    <p className="text-base text-[#7E8CA0]">{description}</p>
                </div>
                <div className="mt-8 flex w-full items-center justify-center">
                    {/* -------------- */}
                    {children}
                    {/* -------------- */}
                </div>
            </div>
        </div>
    );
};

export default AuthPageWrapper;
