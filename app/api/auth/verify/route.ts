import { connectToDatabase } from "@/lib/mongodb/mongoose";
import handleError from "@/lib/handlers/error";
import { SignInSchema } from "@/lib/validation/auth";
import { getAccountById, getUserByEmail } from "@/lib/actions/user.action";
import { NotFoundError, ValidationError } from "@/lib/http-error";

import { ErrorResponse } from "@/types/server";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        const validatedData = SignInSchema.safeParse(body);

        if (!validatedData.success) {
            throw new ValidationError(
                validatedData.error.flatten().fieldErrors
            );
        }

        const { email, password } = validatedData.data;

        const existingUser = await getUserByEmail(email);
        if (!existingUser) throw new NotFoundError("User");

        const existingAccount = await getAccountById(existingUser.id);
        if (!existingAccount) throw new NotFoundError("Account");

        if (!existingAccount?.password) {
            throw new Error("You need to create your account by credentials!");
        }
        const isPasswordMatches = await bcrypt.compare(
            password,
            existingAccount.password
        );

        if (!isPasswordMatches) {
            throw new Error("Password is incorrect!");
        }

        // Return the user data as a successful response
        return NextResponse.json(
            {
                success: true,
                user: {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                    image: existingUser.image,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error, "api") as ErrorResponse;
    }
}
