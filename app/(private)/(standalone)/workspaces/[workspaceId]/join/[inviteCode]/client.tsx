"use client";

import JoinWorkspaceForm from "@/components/shared/form/non-dialog/JoinWorkspaceForm";
import PageLoader from "@/components/shared/PageLoader";
import { useGetWorkspace } from "@/hooks/actions/useWorkspaces";
import { useParams } from "next/navigation";
import React from "react";

const WorkspaceIdJoinClient = () => {
    const { workspaceId } = useParams();
    const { data, isPending } = useGetWorkspace(workspaceId as string, {
        enabled: !!workspaceId,
    });

    if (isPending) {
        return <PageLoader className="text-white" />;
    }

    return (
        <div>
            <div className="relative min-h-[100vh] w-full bg-gray-200">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3">
                    {data && <JoinWorkspaceForm initialValues={data} />}
                </div>
            </div>
        </div>
    );
};

export default WorkspaceIdJoinClient;
