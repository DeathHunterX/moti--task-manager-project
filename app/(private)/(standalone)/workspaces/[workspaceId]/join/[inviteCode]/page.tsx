import { Metadata } from "next";

import WorkspaceIdJoinClient from "./client";

export const metadata: Metadata = {
    title: "Join Workspace",
};
const WorkspaceIdJoinPage = () => {
    return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
