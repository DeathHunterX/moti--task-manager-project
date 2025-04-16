import { getAllWorkspaces } from "@/lib/actions/workspace.action";
import WorkspacesClient from "./client";

const WorkspacesPage = async ({ searchParams }: SearchParams) => {
    const { page, pageSize, query, filter } = await searchParams;

    const workspaceData = await getAllWorkspaces({
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        query: query || "",
        filter: filter || "",
    });

    const { workspaces, isNext } = workspaceData.data || {};

    return (
        <div className="mt-6 px-10">
            <WorkspacesClient workspaces={workspaces || []} />
        </div>
    );
};

export default WorkspacesPage;
