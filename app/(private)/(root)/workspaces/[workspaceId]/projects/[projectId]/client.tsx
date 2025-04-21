"use client";
import { PencilIcon } from "lucide-react";

import PageError from "@/components/shared/PageError";
import PageLoader from "@/components/shared/PageLoader";
import ProjectAvatar from "@/components/shared/avatar/ProjectAvatar";
import { Button } from "@/components/ui/button";

import TaskViewSwitcher from "./_components/TaskViewSwitcher";

import { useGetProjectById } from "@/hooks/actions/useProjects";
import { useFormModal } from "@/hooks/use-form-modal";
import { useProjectId } from "@/hooks/use-params";

const ProjectIdClient = () => {
    const projectId = useProjectId();

    const { onOpen, setFormType, setActionType } = useFormModal();

    const { data: projectData, isLoading } = useGetProjectById(projectId, {
        enabled: !!projectId,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (!projectData) {
        return <PageError message="Project not found." />;
    }

    const handleOpenEditProjectForm = () => {
        setFormType("project");
        setActionType("update");

        onOpen(projectId);
    };
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between ms-3">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar
                        name={projectData?.name || ""}
                        image={
                            typeof projectData?.image === "string"
                                ? projectData.image
                                : ""
                        }
                        className="size-8"
                    />
                    <span className="text-md font-medium">
                        {projectData?.name}
                    </span>
                </div>
                <div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenEditProjectForm}
                    >
                        <PencilIcon className="size-4 mr-1" />
                        Edit Project
                    </Button>
                </div>
            </div>

            <TaskViewSwitcher hideProjectFilter />
        </div>
    );
};

export default ProjectIdClient;
