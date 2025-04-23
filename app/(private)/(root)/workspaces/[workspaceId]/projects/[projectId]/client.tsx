"use client";
import { PencilIcon, Trash } from "lucide-react";

import PageError from "@/components/shared/PageError";
import PageLoader from "@/components/shared/PageLoader";
import ProjectAvatar from "@/components/shared/avatar/ProjectAvatar";
import { Button } from "@/components/ui/button";

import TaskViewSwitcher from "../../../../../../../components/features/tasks/TaskViewSwitcher";

import {
    useDeleteProject,
    useGetProjectById,
} from "@/hooks/actions/useProjects";
import { useFormModal } from "@/hooks/use-form-modal";
import { useProjectId, useWorkspaceId } from "@/hooks/use-params";
import { useGetProjectAnalytics } from "@/hooks/actions/useAnalytics";
import Analytics from "@/components/shared/analytics/Analytics";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

const ProjectIdClient = () => {
    const projectId = useProjectId();
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const { onOpen, setFormType, setActionType } = useFormModal();

    const { data: projectData, isLoading: isLoadingProjectData } =
        useGetProjectById(projectId, {
            enabled: !!projectId,
        });

    const { data: projectAnalyticsData, isLoading: isLoadingProjectAnalytics } =
        useGetProjectAnalytics(projectId, {
            enabled: !!projectId,
        });

    const { mutate: deleteProject, isPending: isDeletingProject } =
        useDeleteProject({ workspaceId, projectId });

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Project",
        "This action cannot be undone.",
        "destructive"
    );

    const handleOpenEditProjectForm = () => {
        setFormType("project");
        setActionType("update");

        onOpen(projectId);
    };

    const handleDeleteProject = async () => {
        const ok = await confirmDelete();
        if (!ok) return;

        deleteProject(
            { projectId: projectId, workspaceId: workspaceId },
            {
                onSuccess: () => {
                    router.push(`/workspaces/${workspaceId}`);
                },
            }
        );
    };

    const isLoading = isLoadingProjectData || isLoadingProjectAnalytics;

    if (isLoading) {
        return <PageLoader />;
    }

    if (!projectData || !projectAnalyticsData) {
        return <PageError message="Project not found." />;
    }
    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog />
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
                <div className="flex items-center gap-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenEditProjectForm}
                    >
                        <PencilIcon className="size-4 mr-1" />
                        Edit Project
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteProject}
                    >
                        <Trash className="size-4 mr-1" />
                        Delete
                    </Button>
                </div>
            </div>
            {projectAnalyticsData && <Analytics data={projectAnalyticsData} />}
            <TaskViewSwitcher hideProjectFilter />
        </div>
    );
};

export default ProjectIdClient;
