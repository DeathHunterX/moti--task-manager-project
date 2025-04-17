"use client";
import React, { useEffect, useState } from "react";
import WorkspaceForm from "@/components/shared/form/dialog/workspace/WorkspaceForm";
import {
    useDeleteWorkspace,
    useGetWorkspace,
    useResetWorkspaceInviteCode,
} from "@/hooks/actions/useWorkspaces";
import { useParams } from "next/navigation";
import PageLoader from "@/components/shared/PageLoader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { CopyIcon } from "lucide-react";

const WorkspaceSettingsClient = () => {
    const { workspaceId } = useParams();
    const { data, isPending } = useGetWorkspace(workspaceId as string, {
        enabled: !!workspaceId,
    });

    const {
        mutate: deleteWorkspaceMutation,
        isPending: isDeletingWorkspacePending,
    } = useDeleteWorkspace();

    const {
        mutate: resetWorkspaceInviteCode,
        isPending: isResetingWorkspaceInviteCode,
    } = useResetWorkspaceInviteCode();

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Workspace",
        "This action cannot be undone.",
        "destructive"
    );

    const [ResetDialog, confirmReset] = useConfirm(
        "Reset Invite Link",
        "This will invalidate the current invite link",
        "destructive"
    );

    const [fullInviteLink, setFullInviteLink] = useState<string>("");

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteWorkspaceMutation(
            { workspaceId: workspaceId as string },
            {
                onSuccess: () => {
                    window.location.href = "/workspaces";
                },
            }
        );
    };

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if (!ok) return;

        resetWorkspaceInviteCode({ workspaceId: data?._id as string });
    };

    useEffect(() => {
        if (data?._id && data?.inviteCode) {
            setFullInviteLink(
                `${window.location.origin}/workspaces/${data._id}/join/${data.inviteCode}`
            );
        }
    }, [data]);

    const handleCopyInviteLink = () => {
        navigator.clipboard
            .writeText(fullInviteLink)
            .then(() => toast.success("Invite link copied to clipboard."));
    };

    if (isPending) {
        return <PageLoader />;
    }

    return (
        <div className="px-4 w-full ">
            <DeleteDialog />
            <ResetDialog />

            <div className="flex flex-row justify-between">
                <h1 className="ms-10 mb-1.5 text-2xl text-[#172B4D]">
                    Settings
                </h1>
            </div>

            <div className="flex flex-col mx-auto gap-y-4 lg:max-w-xl">
                <div className="flex flex-row justify-center">
                    <div className="shadow-xl px-8 py-5 rounded-md w-full">
                        <WorkspaceForm
                            actionType="update"
                            initialValue={data}
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-center">
                    <Card className="shadow-xl w-full">
                        <CardContent className="p-7">
                            <div className="flex flex-col">
                                <h3 className="font-bold">Invite Members</h3>
                                <p className="text-sm text-muted-foreground">
                                    Use the invite link to add members to your
                                    workspace.
                                </p>

                                <div className="mt-4">
                                    <div className="flex items-center gap-x-2">
                                        <Input
                                            disabled
                                            value={fullInviteLink}
                                        />
                                        <Button
                                            onClick={handleCopyInviteLink}
                                            variant="secondary"
                                            className="size-12"
                                        >
                                            <CopyIcon className="size-5" />
                                        </Button>
                                    </div>
                                </div>
                                {/* <DottedSeparator className="py-7" /> */}
                                <Button
                                    className="mt-6 w-fit ml-auto"
                                    size="sm"
                                    variant="destructive"
                                    type="button"
                                    disabled={isResetingWorkspaceInviteCode}
                                    onClick={handleResetInviteCode}
                                >
                                    Reset Invite Link
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-row justify-center">
                    <Card className="shadow-xl w-full">
                        <CardContent className="p-7">
                            <div className="flex flex-col">
                                <h3 className="font-bold">Danger Zone</h3>
                                <p className="text-sm text-muted-foreground">
                                    Deleting a workspace is a irreversible and
                                    will remove all associated data.
                                </p>

                                <Button
                                    className="mt-6 w-fit ml-auto"
                                    size="sm"
                                    variant="destructive"
                                    type="button"
                                    disabled={isDeletingWorkspacePending}
                                    onClick={handleDelete}
                                >
                                    Delete Workspace
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceSettingsClient;
