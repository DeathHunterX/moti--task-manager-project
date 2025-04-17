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
