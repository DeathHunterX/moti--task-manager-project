// User
interface GetUserAccountParams {
    userId: string;
}

/*
 *  Workspace
 */
interface CreateWorkspaceParams {
    name: string;
    image: File | string | undefined;
}

interface EditWorkspaceParams extends CreateWorkspaceParams {
    workspaceId: string;
}

interface DeleteWorkspaceParams {
    workspaceId: string;
}

interface GetWorkspaceByIdParams {
    workspaceId: string;
}

interface ResetInvitationCodeByWorkspaceIdParams {
    workspaceId: string;
}

interface JoinWorkspaceByInviteCodeParams {
    workspaceId: string;
    inviteCode: string;
}

/*
 *  Workspace Member
 */

interface GetWorkspaceMembersParams {
    workspaceId: string;
}

interface DeleteWorkspaceMemberParams {
    workspaceId: string;
    memberId: string;
}

interface GrantRoleWorkspaceMemberParams {
    workspaceId: string;
    memberId: string;
    role: "ADMIN" | "MEMBER";
}

/*
 *  Projects
 */
interface GetAllProjectsParams {
    workspaceId: string;
}

interface GetProjectByIdParams extends GetAllProjectsParams {
    projectId: string;
}

interface CreateProjectParams extends GetAllProjectsParams {
    name: string;
    image?: File | string;
}

interface EditProjectParams extends GetProjectByIdParams {
    name: string;
    image?: File | string;
}

interface DeleteProjectParams extends GetAllProjectsParams {
    projectId: string;
}

/*
 *  Tasks
 */

interface CreateTaskParams {
    workspaceId: string;
    name: string;
    projectId: string;
    assigneeId: string;
    description?: string;
    dueDate: Date;
    status: TaskStatus;
}

interface GetTasksParams {
    workspaceId: string;
    projectId: string;
    assigneeId: string;
    status?: TaskStatus | null;
    search?: string | null;
    dueDate?: string | null;
}
