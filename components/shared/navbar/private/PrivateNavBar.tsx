import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Bell,
    ChevronDown,
    CircleHelp,
    Plus,
    Search,
    Settings,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import UserNav from "./UserNav";
import Link from "next/link";

const PrivateNavBar = () => {
    return (
        <>
            <header className="border-b-gray-300 border-b px-4 py-2 flex flex-row justify-between items-center bg-white z-20 fixed top-0 w-full">
                <div className="flex flex-row gap-x-1 sm:gap-x-4 items-center">
                    <div className="">
                        <Link href="/your-work">
                            <Image
                                src="/logo.png"
                                width={100}
                                height={50}
                                alt="Moti logo"
                            />
                        </Link>
                    </div>

                    <div className="">
                        <div className="flex flex-row gap-x-3.5 items-center">
                            <Link
                                href="/"
                                className="flex max-[735px]:hidden flex-row gap-x-2 items-center hover:bg-gray-200 px-2.5 py-1.5 rounded-xs"
                            >
                                <span className="text-sm">Your work</span>
                                {/* <ChevronDown size={14} /> */}
                            </Link>
                            <Link
                                href="/workspaces"
                                className="flex max-[835px]:hidden flex-row gap-x-2 items-center hover:bg-gray-200 px-2.5 py-1.5 rounded-xs"
                            >
                                <span className="text-sm">Workspaces</span>
                                {/* <ChevronDown size={14} /> */}
                            </Link>

                            {/* <Link
                                href="#"
                                className="flex max-[935px]:hidden flex-row gap-x-2 items-center hover:bg-gray-200 px-2.5 py-1.5 rounded-xs"
                            >
                                <span className="text-sm">Projects</span>
                                <ChevronDown size={14} />
                            </Link> */}
                            {/* <div className="">
                                <div className="hidden max-[935px]:flex flex-row gap-x-2 items-center hover:bg-gray-200 px-2.5 py-1.5 rounded-xs">
                                    <span className="text-sm">More</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div> */}
                            {/* <div className="">
                                <Button className="hidden lg:block bg-blue-500 hover:bg-blue-700">
                                    Create
                                </Button>
                                <Button className="block min-lg:hidden max-sm:hidden bg-blue-500 hover:bg-blue-700">
                                    <Plus />
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-x-4 items-center">
                    <div className="">
                        <Input
                            placeholder="Search..."
                            className="placeholder:text-sm focus-visible:ring-offset-0 focus-visible:ring-0 block max-[800px]:hidden"
                        />
                        <Search
                            size={20}
                            className="hidden max-[800px]:block"
                        />
                    </div>
                    <div className="">
                        <Bell size={20} />
                    </div>
                    <div className="block max-md:hidden">
                        <CircleHelp size={20} />
                    </div>
                    <div className="block max-[675px]:hidden">
                        <Settings size={20} />
                    </div>
                    <UserNav />
                </div>
            </header>
        </>
    );
};

export default PrivateNavBar;
