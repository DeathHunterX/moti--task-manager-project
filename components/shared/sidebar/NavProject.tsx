"use client";

import { CirclePlus } from "lucide-react";

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useFormModal } from "@/hooks/use-form-modal";
import { useGetProjects } from "@/hooks/actions/useProjects";
import Link from "next/link";

import ProjectAvatar from "../avatar/ProjectAvatar";
import { useWorkspaceId } from "@/hooks/use-params";

export function NavProject() {
    const { setFormType, setActionType, onOpen } = useFormModal();

    const workspaceId = useWorkspaceId();
    const { data } = useGetProjects(workspaceId as string);

    const handleOpenProjectForm = () => {
        setFormType("project");
        setActionType("create");
        onOpen();
    };

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <div className="flex flex-row justify-between pb-2">
                <small className=" text-gray-500 px-2">Projects</small>
                <span
                    className="text-xs text-gray-500 px-2"
                    onClick={handleOpenProjectForm}
                >
                    <CirclePlus size={14} />
                </span>
            </div>
            <SidebarMenu>
                {(data || []).map((item) => (
                    <SidebarMenuItem key={item._id} className="my-0.5">
                        <SidebarMenuButton asChild>
                            <Link
                                href={`/workspaces/${workspaceId}/projects/${item._id}`}
                            >
                                <ProjectAvatar
                                    image={item.image as string}
                                    name={item.name}
                                />
                                <span className="text-md font-medium">
                                    {item.name}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
