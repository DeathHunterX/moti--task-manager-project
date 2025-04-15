import { z } from "zod";

export const PaginatedSearchParamsSchema = z.object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().default(10),
    query: z.string().optional(),
    filter: z.string().optional(),
    sort: z.string().optional(),
});

export const CreateWorkspaceSchema = z.object({
    name: z.string().min(2, {
        message: "Workspace name must be at least 2 characters.",
    }),
    image: z
        .union([
            z.string().transform((value) => (value === "" ? undefined : value)),
            z.instanceof(File),
        ])
        .optional(),
});

export const UpdateWorkspaceSchema = CreateWorkspaceSchema.extend({
    workspaceId: z.string({ message: "Workspace Id is requried" }),
});
