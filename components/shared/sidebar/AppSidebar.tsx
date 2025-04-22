"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { NavMain } from "./NavMain";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { NavProject } from "./NavProject";
import { privateSidebarMap } from "@/constants";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
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
                <NavMain items={privateSidebarMap} />
                <NavProject />
            </SidebarContent>

            <SidebarFooter className="items-end">
                <SidebarTrigger className="mb-8" />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
