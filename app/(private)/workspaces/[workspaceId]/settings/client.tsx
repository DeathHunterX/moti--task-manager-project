"use client";
import React from "react";
import WorkspaceForm from "@/components/shared/form/dialog/workspace/WorkspaceForm";
import {
    useDeleteWorkspace,
    useGetWorkspace,
} from "@/hooks/actions/useWorkspaces";
import { useParams } from "next/navigation";
import PageLoader from "@/components/shared/PageLoader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

const WorkspaceSettingsClient = () => {
    const { workspaceId } = useParams();
    const { data, isPending } = useGetWorkspace(workspaceId as string, {
        enabled: !!workspaceId,
    });

    const {
        mutate: deleteWorkspaceMutation,
        isPending: isDeletingWorkspacePending,
    } = useDeleteWorkspace();

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Workspace",
        "This action cannot be undone.",
        "destructive"
    );

    if (isPending) {
        return <PageLoader />;
    }

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;
        console.log(workspaceId);
        deleteWorkspaceMutation(
            { workspaceId: workspaceId as string },
            {
                onSuccess: () => {
                    window.location.href = "/workspaces";
                },
            }
        );
    };

    return (
        <div className="px-4 w-full ">
            <DeleteDialog />

            <div className="flex flex-row justify-between">
                <h1 className="ms-10 mb-1.5 text-2xl text-[#172B4D]">
                    Settings
                </h1>
            </div>
            <div className="flex flex-row justify-center">
                <div className="shadow-xl px-8 py-5 rounded-md w-full lg:max-w-xl">
                    <WorkspaceForm actionType="update" initialValue={data} />
                </div>
            </div>

            <div className="flex flex-row justify-center mt-10">
                <Card className="shadow-xl">
                    <CardContent className="p-7">
                        <div className="flex flex-col">
                            <h3 className="font-bold">Danger Zone</h3>
                            <p className="text-sm text-muted-foreground">
                                Deleting a workspace is a irreversible and will
                                remove all associated data.
                            </p>
                            {/* <DottedSeparator className="py-7" /> */}
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
    );
};

export default WorkspaceSettingsClient;
