import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white border-t-[#e4e8ee] px-8 pb-8 pt-14 shadow-sm">
            <div className="max-w-[1200px] mx-auto flex flex-col flex-nowrap md:flex-wrap md:flex-row justify-between gap-8 md:gap-6">
                <div className="flex-[1] min-w-[200px]">
                    <Image src="/logo.png" width={150} height={50} alt="Moti" />
                    <p className="text-[#6b7280] text-sm mb-5">
                        Streamline your workflow and boost productivity with the
                        most intuitive task management platform on the market.
                    </p>
                </div>
                <div className="flex-[1] min-w-[200px]">
                    <h4 className="text-[#3a86ff] mb-4 text-base">Product</h4>
                    <ul>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Feature
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Integration
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                What's new
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-[1] min-w-[200px]">
                    <h4 className="text-[#3a86ff] mb-4 text-base">Resources</h4>
                    <ul>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Documentation
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Tutorials & Guides
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Templates
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Blog
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Help Center
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex-[1] min-w-[200px]">
                    <h4 className="text-[#3a86ff] mb-4 text-base">Company</h4>
                    <ul>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                About Us
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Careers
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Press Kit
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex-[1] min-w-[200px]">
                    <h4 className="text-[#3a86ff] mb-4 text-base">Legal</h4>
                    <ul>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Terms of Service
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Security
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="#"
                                className="text-[#6b7280] text-sm hover:text-[#3a86ff]"
                            >
                                Cookies
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-9 pt-5 border-t-[#e4e8ee] text-center text-[#9ca3af] text-xs w-full">
                © 2025 Moti - Task Manager System. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
