"use client";

import RecentSection from "./_components/RecentSection";
import { useGetWorkspaces } from "@/hooks/actions/useWorkspaces";

const YourWorkClient = () => {
    const { data: workspaceData, isPending: isWorkspaceData } =
        useGetWorkspaces();

    return (
        <div>
            <RecentSection
                title="Recent Workspaces"
                data={workspaceData || []}
                noItemsMessage="No workspaces found"
                linkHref="/workspaces"
                linkText="View all workspaces"
            />
            <RecentSection
                title="Recent Projects"
                data={[]}
                noItemsMessage="No projects found"
                linkHref="/projects"
                linkText="View all projects"
            />
        </div>
    );
};

export default YourWorkClient;
