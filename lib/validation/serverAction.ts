import { z } from "zod";

export const GetUserAccountSchema = z.object({
    userId: z.string({ message: "User Id is required" }),
});

export const GetUserAccountByIdSchema = GetUserAccountSchema.extend({});

export const GetWorkspaceByIdSchema = z.object({
    workspaceId: z.string({ message: "Workspace Id is requried" }),
});

export const DeleteWorkspaceSchema = GetWorkspaceByIdSchema.extend({});
