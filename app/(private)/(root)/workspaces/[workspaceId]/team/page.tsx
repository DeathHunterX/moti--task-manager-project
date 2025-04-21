import { Metadata } from "next";
import React from "react";
import WorkspaceTeamClient from "./client";

export const metadata: Metadata = {
    title: "Team",
};

const WorkspaceTeamPage = () => {
    return <WorkspaceTeamClient />;
};

export default WorkspaceTeamPage;
