type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

interface Workspace {
    _id: string;
    name: string;
    image: File | string;
    userId: string;
    inviteCode: string;
}

interface Member {
    _id: string;
    workspaceId: string;
    userId: string;
    name: string;
    image: string;
    role: "ADMIN" | "MEMBER";
}

interface Project {
    _id: string;
    name: string;
    image: string;
    workspaceId: string;
}

interface Task {
    _id: string;
    workspaceId: string;
    name: string;
    projectId: string;
    project?: Project;
    assigneeId: string;
    assignee?: User;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    position: number;
}

interface ProjectAnalytics {
    taskCount: number;
    taskDifference: number;

    assignedTaskCount: number;
    assignedTaskDifference: number;

    completedTaskCount: number;
    completedTaskDifference: number;

    incompleteTaskCount: number;
    incompleteTaskDifference: number;

    overdueTaskCount: number;
    overdueTaskDifference: number;
}

interface PaginatedSearchParams {
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
    sort?: string;
}

interface SearchParams {
    searchParams: Promise<{ [key: string]: string }>;
}
