import WorkspaceForm from "@/components/shared/form/WorkspaceForm";
import { Button } from "@/components/ui/button";
import { getAllWorkspace } from "@/lib/actions/workspace.action";

import React from "react";
import WorkspaceTable from "./_components/workspaceTable";

const WorkspacesPage = async ({ searchParams }: SearchParams) => {
    const { page, pageSize, query, filter } = await searchParams;

    const workspaceData = await getAllWorkspace({
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        query: query || "",
        filter: filter || "",
    });

    const { workspaces, isNext } = workspaceData.data || {};

    return (
        <div className="mt-6 px-10">
            <div className="flex flex-row justify-between">
                <h1 className="mb-1.5 text-2xl text-[#172B4D]">Workspace</h1>
                <WorkspaceForm
                    trigger={
                        <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                            Create Project
                        </Button>
                    }
                />
            </div>
            <div className="">
                <WorkspaceTable data={workspaces || []} />
            </div>
        </div>
    );
};

export default WorkspacesPage;
