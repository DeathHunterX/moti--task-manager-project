import { z } from "zod";

/*
 *  User
 */
export const GetUserAccountSchema = z.object({
    userId: z.string({ message: "User Id is required!" }),
});

export const GetUserAccountByIdSchema = GetUserAccountSchema.extend({});

/*
 *  Workspace
 */
export const GetWorkspaceByIdSchema = z.object({
    workspaceId: z.string({ message: "Workspace Id is requried!" }),
});

export const DeleteWorkspaceSchema = GetWorkspaceByIdSchema.extend({});

export const ResetInvitationCodeByWorkspaceIdSchema =
    GetWorkspaceByIdSchema.extend({});

export const JoinWorkspaceByInviteCodeSchema = GetWorkspaceByIdSchema.extend({
    inviteCode: z.string({ message: "Invite code is required!" }),
});

/*
 *  Workspace Member
 */
export const GetWorkspaceMembersSchema = z.object({
    workspaceId: z.string({ message: "Workspace Id is required!" }),
});

export const DeleteWorkspaceMemberSchema = GetWorkspaceMembersSchema.extend({
    memberId: z.string({ message: "Member Id is required!" }),
});

export const GrantRoleWorkspaceMemberSchema = GetWorkspaceMembersSchema.extend({
    memberId: z.string({ message: "Member Id is required!" }),
    role: z.enum(["ADMIN", "MEMBER"], {
        message: "ADMIN or MEMBER role only!",
    }),
});

/*
 *  Projects
 */

export const GetAllProjectsSchema = z.object({
    workspaceId: z.string({ message: "Workspace Id is required!" }),
});

export const GetProjectByIdSchema = GetAllProjectsSchema.extend({
    projectId: z.string({ message: "Project Id is required!" }),
});

export const CreateProjectServerSchema = GetAllProjectsSchema.extend({
    name: z.string().trim().min(2, {
        message: "Projects name must be at least 2 characters.",
    }),
    image: z
        .union([
            z.string().transform((value) => (value === "" ? "" : value)),
            z.instanceof(File),
        ])
        .optional(),
});

export const EditProjectByIdSchema = CreateProjectServerSchema.extend({
    projectId: z.string().min(1, { message: "Project Id is required!" }),
});

export const DeleteProjectByIdSchema = GetAllProjectsSchema.extend({
    projectId: z.string().min(1, { message: "Project Id is required!" }),
});

/*
 *  Tasks
 */

export enum TaskStatusEnum {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
}

export const CreateTaskSchema = z.object({
    name: z.string().trim().min(1, "Name is required!"),
    status: z.nativeEnum(TaskStatusEnum, {
        message: "You need to choose status!",
    }),
    workspaceId: z.string().trim().min(1, "Workspace Id is required!"),
    projectId: z.string().trim().min(1, "Project Id is required!"),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, "Assignee Id is required"),
    description: z.string().optional(),
});

export const GetTasksSchema = z.object({
    workspaceId: z.string(),
    projectId: z.string().nullish(),
    assigneeId: z.string().nullish(),
    status: z.nativeEnum(TaskStatusEnum).nullish(),
    search: z.string().nullish(),
    dueDate: z.string().nullish(),
});

export const GetTaskByIdSchema = z.object({
    taskId: z.string(),
});

export const EditTaskSchema = CreateTaskSchema.extend({
    taskId: z.string(),
});

export const DeleteTaskSchema = z.object({
    taskId: z.string(),
    workspaceId: z.string(),
});

export const BulkUpdateTasksSchema = z.object({
    tasks: z.array(
        z.object({
            _id: z.string(),
            status: z.nativeEnum(TaskStatusEnum),
            position: z.number().int().positive().min(1000).max(1_000_000),
        })
    ),
});
