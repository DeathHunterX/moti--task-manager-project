import ProjectIdClient from "./client";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project",
};

const ProjectPage = () => {
    return <ProjectIdClient />;
};

export default ProjectPage;
