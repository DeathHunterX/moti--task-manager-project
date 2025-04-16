import { z } from "zod";

export const GetUserAccountSchema = z.object({
    userId: z.string({ message: "User Id is required" }),
});

export const GetUserAccountByIdSchema = GetUserAccountSchema.extend({});

export const GetWorkspaceByIdSchema = z.object({
    workspaceId: z.string({ message: "Workspace Id is requried" }),
});

export const DeleteWorkspaceSchema = GetWorkspaceByIdSchema.extend({});

export const ResetInvitationCodeByWorkspaceIdSchema =
    GetWorkspaceByIdSchema.extend({});

export const JoinWorkspaceByInviteCodeSchema = GetWorkspaceByIdSchema.extend({
    inviteCode: z.string({ message: "Invite code is required" }),
});
