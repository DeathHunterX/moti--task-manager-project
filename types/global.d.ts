type TaskStatusType = "BACKLOG" | "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
type MemberRoleType = "ADMIN" | "MEMBER";

interface User {
    _id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface Workspace {
    _id: string;
    name: string;
    image: File | string;
    userId: string;
    workspaceCreator?: string;
    inviteCode: string;
}

interface Member {
    _id: string;
    workspaceId: string;
    userId: string;
    name: string;
    image: string;
    email: string;
    role: MemberRoleType;
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
    assignee?: Member;
    description: string;
    dueDate: Date;
    status: TaskStatusType;
    position: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Analytics {
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
