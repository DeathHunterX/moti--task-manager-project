"use client";
import Image from "next/image";
import { MoreVerticalIcon } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import PageLoader from "@/components/shared/PageLoader";

import {
    useGetWorkspaceMembers,
    useGrantRoleWorkspaceMember,
    useRemoveWorkspaceMember,
} from "@/hooks/actions/useMembers";

import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-params";
import { MemberRoleDict } from "@/constants";
import InviteMemberModal from "@/components/features/members/InviteMemberModal";

const WorkspaceTeamClient = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspaceMembers(workspaceId, {
        enabled: !!workspaceId,
    });

    const [RemoveDialog, confirmRemove] = useConfirm(
        "Remove Member from Workspace?",
        "Are you sure you want to remove this member from the workspace? They will lose access to all workspace resources and data."
    );

    const { mutate: removeWorkspaceMember, isPending: isRemovingMember } =
        useRemoveWorkspaceMember(workspaceId);

    const { mutate: grantRoleMember, isPending: isGrantingRoleMember } =
        useGrantRoleWorkspaceMember(workspaceId);

    const isPending = isGrantingRoleMember || isRemovingMember;

    const handleGrantRoleMember = (memberId: string, role: MemberRoleType) => {
        grantRoleMember({ workspaceId, role, memberId });
    };

    const handleRemoveMember = async (memberId: string) => {
        const ok = await confirmRemove();

        if (!ok) return;

        removeWorkspaceMember({
            workspaceId: workspaceId as string,
            memberId: memberId,
        });
    };

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-y-4 w-full">
            <RemoveDialog />

            <div className="flex flex-row justify-between items-center">
                <h1 className="ms-3 text-xl text-[#172B4D]">Teams</h1>
                <InviteMemberModal />
            </div>
            <div className="flex justify-center w-full">
                <div className="max-w-[80rem] w-full">
                    <Table className="w-full">
                        {(data || []).length === 0 && (
                            <TableCaption>
                                <div className="flex flex-col items-center ">
                                    <Image
                                        src="/data-not-found.png"
                                        width={300}
                                        height={300}
                                        alt="Not found data"
                                    ></Image>
                                    <h2>No members were found</h2>
                                    <p>Try add members to work with you</p>
                                </div>
                            </TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">
                                    Name
                                </TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="w-[100px] text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(data ?? []).length > 0 ? (
                                (data ?? []).map((member) => (
                                    <TableRow key={member?._id}>
                                        {/* Name */}
                                        <TableCell className="py-3 flex flex-row gap-x-3 items-center font-medium">
                                            <Avatar className="size-8">
                                                <AvatarImage
                                                    src={
                                                        typeof member.image ===
                                                        "string"
                                                            ? member.image
                                                            : member.image
                                                            ? URL.createObjectURL(
                                                                  member.image
                                                              )
                                                            : ""
                                                    }
                                                    alt={member.name ?? ""}
                                                />
                                                <AvatarFallback>
                                                    {member.name?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {member.name}
                                        </TableCell>

                                        {/* Role */}
                                        <TableCell className="py-3">
                                            {member.role}
                                        </TableCell>

                                        {/* Email */}

                                        <TableCell className="py-3">
                                            <span className="line-clamp-1">
                                                {member.email}
                                            </span>
                                        </TableCell>

                                        {/* Action */}
                                        <TableCell className="py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    asChild
                                                    className="flex mx-auto"
                                                >
                                                    <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    side="bottom"
                                                    align="end"
                                                >
                                                    <DropdownMenuItem
                                                        className="font-medium"
                                                        onClick={() =>
                                                            handleGrantRoleMember(
                                                                member._id,
                                                                MemberRoleDict.ADMIN as MemberRoleType
                                                            )
                                                        }
                                                        disabled={
                                                            isPending ||
                                                            member.role ===
                                                                "ADMIN"
                                                        }
                                                    >
                                                        Set as Administrator
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="font-medium"
                                                        onClick={() =>
                                                            handleGrantRoleMember(
                                                                member._id,
                                                                MemberRoleDict.MEMBER as MemberRoleType
                                                            )
                                                        }
                                                        disabled={
                                                            isPending ||
                                                            member.role ===
                                                                "MEMBER"
                                                        }
                                                    >
                                                        Set as Member
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="font-medium text-amber-700"
                                                        onClick={() =>
                                                            handleRemoveMember(
                                                                member.userId
                                                            )
                                                        }
                                                        disabled={isPending}
                                                    >
                                                        Remove {member.name}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <></>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceTeamClient;
