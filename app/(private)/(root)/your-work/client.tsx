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

            {/* <div className="">
                    <Tabs defaultValue="workspaces" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="worked-on">
                                Worked on
                            </TabsTrigger>
                            <TabsTrigger value="viewed">Viewed</TabsTrigger>
                            <TabsTrigger value="assigned">
                                Assigned to me
                            </TabsTrigger>
                            <TabsTrigger value="starred">Starred</TabsTrigger>
                        </TabsList>
                        <TabsContent value="workspaces">
                            Make changes to your account here.
                        </TabsContent>
                        <TabsContent value="projects">
                            Change your password here.
                        </TabsContent>
                    </Tabs>
                </div> */}
        </div>
    );
};

export default YourWorkClient;
