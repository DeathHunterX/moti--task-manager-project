import { ErrorToastMsg } from "@/components/shared/Toast";
import {
    createProject,
    getAllProjects,
    getProjectById,
} from "@/lib/actions/project.action";

import { RequestError } from "@/lib/http-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { toast } from "react-toastify";

export const useGetProjects = (workspaceId: string) => {
    const query = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await getAllProjects({ workspaceId: workspaceId });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            return Array.isArray(response.data)
                ? response.data
                : response.data
                ? [response.data]
                : [];
        },
    });
    return query;
};

export const useGetProjectById = (
    { projectId }: { projectId: string },
    options?: { enabled?: boolean }
) => {
    const { workspaceId: rawWorkspaceId } = useParams();
    const workspaceId = rawWorkspaceId as string;

    const query = useQuery({
        queryKey: ["project", { projectId }],
        enabled: options?.enabled ?? (!!workspaceId && !!projectId),
        queryFn: async () => {
            if (!workspaceId) {
                throw new Error("Workspace ID is undefined");
            }
            const response = await getProjectById({ workspaceId, projectId });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid workspace data received");
            }
            return response.data as Project;
        },
    });
    return query;
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CreateProjectParams) => {
            const response = await createProject(data);

            if (!response.success) {
                // Throw an error if the response indicates failure
                const status = response?.status ?? 500;
                const message =
                    response?.error?.message || "Something went wrong";
                throw new Error(`${status}: ${message}`);
            }

            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully create a project!");

            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage ||
                    "Something went wrong while creating project!",
            });
        },
    });
    return mutation;
};
