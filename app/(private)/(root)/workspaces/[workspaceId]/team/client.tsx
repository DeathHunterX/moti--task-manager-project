"use client";

import {
    useGetWorkspaceMembers,
    useRemoveWorkspaceMember,
} from "@/hooks/actions/useMembers";
import { useParams } from "next/navigation";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PageLoader from "@/components/shared/PageLoader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConfirm } from "@/hooks/use-confirm";

const WorkspaceTeamClient = () => {
    const { workspaceId } = useParams();
    const { data, isPending } = useGetWorkspaceMembers(workspaceId as string, {
        enabled: !!workspaceId,
    });

    const { mutate: removeWorkspaceMemberMutate, isPending: isRemoveMember } =
        useRemoveWorkspaceMember(workspaceId as string);

    const [RemoveDialog, confirmRemove] = useConfirm(
        "Remove Member from Workspace?",
        "Are you sure you want to remove this member from the workspace? They will lose access to all workspace resources and data."
    );

    const handleRemoveMember = async (memberId: string) => {
        const ok = await confirmRemove();

        if (!ok) return;

        removeWorkspaceMemberMutate({
            workspaceId: workspaceId as string,
            memberId: memberId,
        });
    };

    if (isPending) {
        return <PageLoader />;
    }

    return (
        <>
            <RemoveDialog />
            <Table className="">
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
                        <TableHead className="w-[250px]">Name</TableHead>
                        <TableHead>Role</TableHead>

                        <TableHead className="w-[100px] text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(data ?? []).length > 0 ? (
                        (data ?? []).map((item) => (
                            <TableRow key={item?._id}>
                                <TableCell className="py-3 flex flex-row gap-x-3 items-center font-medium">
                                    <Avatar className="size-8">
                                        <AvatarImage
                                            src={
                                                typeof item.image === "string"
                                                    ? item.image
                                                    : item.image
                                                    ? URL.createObjectURL(
                                                          item.image
                                                      )
                                                    : ""
                                            }
                                            alt={item.name ?? ""}
                                        />
                                        <AvatarFallback>
                                            {item.name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    {item.name}
                                </TableCell>
                                <TableCell className="py-3">
                                    {item.role}
                                </TableCell>
                                <TableCell className="py-3">
                                    <div className="flex flex-row gap-x-1 justify-center">
                                        <Button size="sm">
                                            <Pencil />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-rose-500 hover:bg-rose-600"
                                            onClick={() =>
                                                handleRemoveMember(item.userId)
                                            }
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <></>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default WorkspaceTeamClient;
