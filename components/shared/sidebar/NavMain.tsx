"use client";

import { type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import { useParams } from "next/navigation";
import Link from "next/link";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
    }[];
}) {
    const { workspaceId } = useParams();

    return (
        <SidebarGroup>
            <SidebarGroupLabel asChild>Overview</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const fullHref = `/workspaces/${workspaceId}${item.url}`;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <Link href={fullHref}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
