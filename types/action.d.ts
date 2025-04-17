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
