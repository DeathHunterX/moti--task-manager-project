"use client";

import { useState, useEffect } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useGetWorkspaces } from "@/hooks/actions/useWorkspaces";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { useFormModal } from "@/hooks/use-form-modal";

export function WorkspaceSwitcher() {
    const { isMobile } = useSidebar();
    const { workspaceId } = useParams();
    const router = useRouter();

    const { onOpen, setFormType, setActionType } = useFormModal();

    const { data, isLoading, isError } = useGetWorkspaces();
    const [activeTeam, setActiveTeam] = useState<Workspace | null>(null);

    // Set the active team after data is loaded
    useEffect(() => {
        if (data && workspaceId) {
            const team =
                data.find((workspace) => workspace._id === workspaceId) || null;
            setActiveTeam(team);
        }
    }, [data, workspaceId]);

    if (isLoading) {
        return (
            <div className="flex flex-row justify-between gap-2 items-center h-[48px] p-2">
                <div className="flex aspect-square size-8 relative items-center justify-center rounded-md">
                    <Skeleton className="size-8 rounded-full bg-gray-300" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <Skeleton className="w-full h-8 rounded-full bg-gray-300" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-full text-red-500">
                Failed to load workspaces.
            </div>
        );
    }

    if (!activeTeam) {
        return (
            <div className="flex justify-center items-center h-full text-muted-foreground">
                No active team found.
            </div>
        );
    }

    const handleOpenCreateWorkspaceForm = () => {
        setFormType("workspace");
        setActionType("create");
        onOpen();
    };

    return (
        <SidebarMenu className="focus:ring-0">
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:ring-offset-0 focus-visible:ring-0"
                        >
                            <div className="flex aspect-square items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                {(activeTeam.image as string).trim() !== "" ? (
                                    <div className="size-8 relative">
                                        <Image
                                            src={
                                                typeof activeTeam.image ===
                                                "string"
                                                    ? activeTeam.image
                                                    : URL.createObjectURL(
                                                          activeTeam.image
                                                      )
                                            }
                                            fill
                                            alt={`${activeTeam.name} image`}
                                            className="rounded-md"
                                        />
                                    </div>
                                ) : (
                                    <div className="size-8 bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-md" />
                                )}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeTeam.name}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Teams
                        </DropdownMenuLabel>
                        {(data ?? []).map((workspace, index) => (
                            <DropdownMenuItem
                                key={workspace._id}
                                onClick={() => {
                                    setActiveTeam(workspace); // Update active team
                                    router.push(`/workspaces/${workspace._id}`);
                                }}
                                className="gap-2 p-2 cursor-pointer"
                            >
                                <div className="flex items-center justify-center rounded-sm border">
                                    {(workspace.image as string).trim() !==
                                    "" ? (
                                        <div className="size-6 relative shrink-0">
                                            <Image
                                                src={
                                                    typeof workspace.image ===
                                                    "string"
                                                        ? workspace.image
                                                        : URL.createObjectURL(
                                                              workspace.image
                                                          )
                                                }
                                                fill
                                                alt={`${workspace.name} image`}
                                                className="rounded-sm"
                                            />
                                        </div>
                                    ) : (
                                        <div className="size-6 bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-sm" />
                                    )}
                                </div>
                                {workspace.name}
                                <DropdownMenuShortcut>
                                    ⌘{index + 1}
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="gap-2 p-2 cursor-pointer"
                            onClick={handleOpenCreateWorkspaceForm}
                        >
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">
                                Add workspace
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
