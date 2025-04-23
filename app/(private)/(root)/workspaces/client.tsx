"use client";

import { Button } from "@/components/ui/button";

import { useFormModal } from "@/hooks/use-form-modal";
import WorkspaceTable from "@/components/features/workspaces/WorkspaceTable";
import { useGetWorkspaces } from "@/hooks/actions/useWorkspaces";

const WorkspacesClient = () => {
    const { onOpen, setFormType, setActionType } = useFormModal();
    const { data: workspaces } = useGetWorkspaces();

    const handleOpenCreateWorkspaceForm = () => {
        setFormType("workspace");
        setActionType("create");
        onOpen();
    };

    return (
        <>
            <div className="flex flex-row justify-between">
                <h1 className="mb-1.5 text-2xl text-[#172B4D]">Workspace</h1>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    onClick={handleOpenCreateWorkspaceForm}
                >
                    Create Workspace
                </Button>
            </div>
            <div className="">
                <WorkspaceTable data={workspaces || []} />
            </div>
        </>
    );
};

export default WorkspacesClient;
