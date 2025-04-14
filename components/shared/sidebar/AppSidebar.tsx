"use client";

import * as React from "react";
import {
    AppWindow,
    AudioWaveform,
    CircleCheckBig,
    ClipboardListIcon,
    Cog,
    Command,
    DatabaseIcon,
    FileIcon,
    GalleryVerticalEnd,
    HelpCircleIcon,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import Image from "next/image";
import { TeamSwitcher } from "./TeamSwitcher";

const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Summary",
            url: "#",
            icon: AppWindow,
        },
        {
            title: "My Tasks",
            url: "#",
            icon: CircleCheckBig,
        },
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
        {
            title: "Team",
            url: "#",
            icon: UsersIcon,
        },
    ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar collapsible="offcanvas" {...props} className="">
            <SidebarHeader className="flex flex-row justify-center items-center">
                <div className="size-12"></div>
                {/* <Image
                    src="/logo.png"
                    width={100}
                    height={50}
                    alt="Moti logo"
                /> */}
            </SidebarHeader>
            <SidebarContent>
                <TeamSwitcher teams={data.teams} />
                <NavMain items={data.navMain} />
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
