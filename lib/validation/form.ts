import { z } from "zod";

export const CreateProjectSchema = z.object({
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
