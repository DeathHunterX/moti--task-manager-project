import { useParams } from "next/navigation";

export function useProjectId() {
    const params = useParams();

    return params.projectId as string;
}

export function useWorkspaceId() {
    const params = useParams();

    return params.workspaceId as string;
}
