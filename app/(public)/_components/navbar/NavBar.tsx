"use client";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { publicNavBarMap } from "@/constants";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const NavBar = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

    return (
        <>
            <header className="w-full relative py-4 z-40">
                <div className="container px-5 sm:mx-auto sm:px-0">
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-32">
                            <Link href="/">
                                <Image
                                    src="/logo.png"
                                    width={128}
                                    height={46}
                                    alt="moti-logo"
                                />
                            </Link>
                        </div>
                        <NavLink />
                        <div className="flex flex-row gap-x 4">
                            <div className="hidden md:flex flex-row lg:gap-6 gap-3 items-center text-center">
                                <Link href="/sign-in" className="py-2 px-4">
                                    Log In
                                </Link>
                                <Link href="/sign-up">
                                    <Button className="bg-blue-600 text-white rounded-full">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                            <div
                                className="block md:hidden"
                                onClick={() =>
                                    setIsMobileNavOpen(!isMobileNavOpen)
                                }
                            >
                                {isMobileNavOpen ? <X /> : <Menu />}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {isMobileNavOpen ? (
                <nav className="fixed inset-0 z-10 bg-white block md:hidden">
                    <div className="relative h-full pb-[108px] pt-[79px] sm:pb-[158px]">
                        <ul className="no-scrollbars flex h-full flex-col overflow-y-auto px-8 md:px-5">
                            {publicNavBarMap.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="block shrink-0 overflow-hidden border-b"
                                >
                                    {item.items.length > 0 ? (
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value={item.title}>
                                                <AccordionTrigger className="px-4 text-base font-normal data-[state=open]:border-b rounded-none">
                                                    {item.title}
                                                </AccordionTrigger>
                                                <AccordionContent className="py-2">
                                                    <ul className="">
                                                        {item.items.map(
                                                            (subItem, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="text-base py-2 px-6 hover:underline"
                                                                >
                                                                    <Link
                                                                        href={
                                                                            subItem.url
                                                                        }
                                                                        legacyBehavior
                                                                        passHref
                                                                    >
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <Link
                                            href={`${item.url}`}
                                            className="p-4 relative flex hover:underline"
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="absolute bottom-0 py-7 px-8 w-full grid grid-cols-1 gap-x-5 gap-y-3.5 sm:grid-cols-2 sm:p-8">
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center !leading-none text-center whitespace-nowrap rounded-full 
                                h-11 text-base !font-semibold tracking-tight border"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center !leading-none text-center whitespace-nowrap rounded-full 
                                transition-colors duration-200 hover:bg-blue-400 bg-blue-500 text-white h-11 text-base !font-semibold tracking-tight"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </nav>
            ) : (
                <></>
            )}
        </>
    );
};

export default NavBar;
