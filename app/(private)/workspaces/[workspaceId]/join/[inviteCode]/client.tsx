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
        return <PageLoader />;
    }
    console.log(data);
    return (
        <div>
            <div className="">
                {data && <JoinWorkspaceForm initialValues={data} />}
            </div>
        </div>
    );
};

export default WorkspaceIdJoinClient;
