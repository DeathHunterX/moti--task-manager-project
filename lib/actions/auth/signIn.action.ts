"use server";

import { z } from "zod";
import { SignInSchema } from "@/lib/validation";
import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "@/lib/handlers/error";
import { ConflictError, ValidationError } from "@/lib/http-error";

import { connectToDatabase } from "@/lib/mongodb/mongoose";
import { signIn } from "@/auth";
import User from "@/lib/mongodb/models/user.model";

export const signInWithCredentials = async (
    params: z.infer<typeof SignInSchema>
): Promise<ActionResponse> => {
    try {
        await connectToDatabase();
        const validatedFields = SignInSchema.safeParse(params);

        if (!validatedFields.success) {
            return handleError(
                new ValidationError(
                    validatedFields.error.flatten().fieldErrors
                ),
                "server"
            ) as ErrorResponse;
        }

        const { email, password } = validatedFields.data;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return handleError(
                new ConflictError(
                    "The provided email is not registered. Please sign up your account!"
                )
            ) as ErrorResponse;
        }

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return { success: true, status: 200 };
    } catch (error) {
        return handleError(error, "server") as ErrorResponse;
    }
};
