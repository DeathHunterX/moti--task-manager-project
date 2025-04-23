import React from "react";
import WorkspaceByIdClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Workspace Overview",
};

const WorkspaceByIdPage = () => {
    return <WorkspaceByIdClient />;
};

export default WorkspaceByIdPage;
