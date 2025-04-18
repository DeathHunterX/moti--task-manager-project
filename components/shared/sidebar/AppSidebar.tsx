"use client";

import * as React from "react";
import {
    AppWindow,
    CircleCheckBig,
    SettingsIcon,
    UsersIcon,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { NavMain } from "./NavMain";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { NavProject } from "./NavProject";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const data = {
        navMain: [
            {
                title: "Summary",
                url: "/",
                icon: AppWindow,
            },
            {
                title: "My Tasks",
                url: "#",
                icon: CircleCheckBig,
            },
            {
                title: "Settings",
                url: "/settings",
                icon: SettingsIcon,
            },
            {
                title: "Team",
                url: "/team",
                icon: UsersIcon,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="flex flex-row justify-center items-center">
                <div className="size-12 hidden md:block"></div>
                <Image
                    src="/logo.png"
                    width={100}
                    height={50}
                    alt="Moti logo"
                    className="block md:hidden"
                />
            </SidebarHeader>
            <SidebarContent>
                <WorkspaceSwitcher />
                <NavMain items={data.navMain} />
                <NavProject />
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
