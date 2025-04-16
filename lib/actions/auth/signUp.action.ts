"use server";

import handleError from "@/lib/handlers/error";
import {
    ConflictError,
    NotFoundError,
    ValidationError,
} from "@/lib/http-error";
import { SignUpSchema } from "@/lib/validation/auth";
import { ActionResponse, ErrorResponse } from "@/types/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

import User from "@/lib/mongodb/models/user.model";
import Account from "@/lib/mongodb/models/account.model";
import { connectToDatabase } from "@/lib/mongodb/mongoose";
import { getAccountById, getUserByEmail } from "../queries.action";

export const signUpWithCredentials = async (
    params: z.infer<typeof SignUpSchema>
): Promise<ActionResponse> => {
    try {
        await connectToDatabase();
        const validatedFields = SignUpSchema.safeParse(params);

        if (!validatedFields.success) {
            return handleError(
                new ValidationError(
                    validatedFields.error.flatten().fieldErrors
                ),
                "server"
            ) as ErrorResponse;
        }

        const { name, email, password } = validatedFields.data;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const existingUser = await User.findOne({ email });

        // TODO: Add case if user account isn't verfied, delete it
        if (existingUser) {
            throw new ConflictError(
                "The provided email address is already registered"
            );
        }

        const newUser = await User.create({
            name,
            email,
        });

        await Account.create({
            userId: newUser._id,
            type: "email",
            providerAccountId: email,
            password: hashedPassword,
        });

        // TODO: Send email verification token

        return { success: true, status: 201 };
    } catch (error) {
        return handleError(error, "server") as ErrorResponse;
    }
};

export async function verifyUserCredentials(params: any) {
    try {
        const { email, password } = params;
        if (!email && !password) {
            return {
                success: false,
                user: null,
                error: "You need to fill all the required!",
            };
        }
        const existingUser = await getUserByEmail(email);
        if (!existingUser) throw new NotFoundError("User");

        const existingAccount = await getAccountById(
            existingUser._id! as string
        );

        if (!existingAccount) throw new NotFoundError("Account");

        if (!existingAccount?.password) {
            return {
                success: false,
                user: null,
                error: "Password is required!",
            };
        }
        const isPasswordMatches = await bcrypt.compare(
            password,
            existingAccount.password
        );

        if (!isPasswordMatches) {
            return {
                success: false,
                user: null,
                error: "Password is incorrect.",
            };
        }

        // Return the user data as a successful response
        return {
            success: true,
            user: existingUser,
            status: 200,
        };
    } catch (error) {
        return handleError(error, "server") as ErrorResponse;
    }
}
