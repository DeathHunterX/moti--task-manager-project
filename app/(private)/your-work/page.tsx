import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const YourWorkPage = () => {
    return (
        <div className="mt-6 px-10">
            <div className="border-b border-b-gray-300">
                <h1 className="mb-1.5 text-2xl text-[#172B4D]">Your work</h1>
            </div>
            <div className="">
                <div className="mb-12">
                    <div className="">
                        <h3 className="text-base text-[#172B4D] font-semibold my-3">
                            Recent Workspaces
                        </h3>
                    </div>
                    <div className="text-center py-8">
                        <h3 className="text-base text-[#172B4D] font-semibold">
                            No workspaces found
                        </h3>
                        <p className="text-sm text-[#172B4D] my-5">
                            You have no recently workspaces
                        </p>
                        <Link
                            href="/workspaces"
                            role="button"
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm"
                        >
                            View all workspaces
                        </Link>
                    </div>
                </div>
                <div className="mb-12">
                    <div className="">
                        <h3 className="text-base text-[#172B4D] font-semibold my-3">
                            Recent Projects
                        </h3>
                    </div>
                    <div className="text-center py-8">
                        <h3 className="text-base text-[#172B4D] font-semibold">
                            No Projects found
                        </h3>
                        <p className="text-sm text-[#172B4D] my-5">
                            You have no recently projects
                        </p>
                        <Link
                            href="/workspaces"
                            role="button"
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm"
                        >
                            View all projects
                        </Link>
                    </div>
                </div>
                <div className="">
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
                </div>
            </div>
        </div>
    );
};

export default YourWorkPage;
