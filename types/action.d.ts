// User
interface GetUserAccountParams {
    userId: string;
}

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
