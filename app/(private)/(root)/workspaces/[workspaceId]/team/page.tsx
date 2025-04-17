import { Metadata } from "next";
import React from "react";
import WorkspaceTeamClient from "./client";

export const metadata: Metadata = {
    title: "Team",
};

const WorkspaceTeamPage = () => {
    return (
        <div className="px-4 w-full ">
            <div className="flex flex-row justify-between">
                <h1 className="ms-10 mb-1.5 text-2xl text-[#172B4D]">Teams</h1>
            </div>
            <div className="w-[75rem] mx-auto">
                <WorkspaceTeamClient />
            </div>
        </div>
    );
};

export default WorkspaceTeamPage;
