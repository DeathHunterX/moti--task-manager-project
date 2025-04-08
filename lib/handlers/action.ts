"use server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../http-error";
import { getServerSession, Session } from "next-auth";
// import { connectToDatabase } from "../mongodb/mongoose";

type ActionOptions<T> = {
    params?: T;
    schema?: ZodSchema<T>;
    authorize?: boolean;
};

// 1. Checking whether the schema and params are provided and validated.
// 2. Checking whether the user is authorized.
// 3. Connecting to the database.
// 4. Returning the params and session.

async function action<T>({
    params,
    schema,
    authorize = false,
}: ActionOptions<T>) {
    if (schema && params) {
        try {
            schema.parse(params);
        } catch (error) {
            if (error instanceof ZodError) {
                return new ValidationError(
                    error.flatten().fieldErrors as Record<string, string[]>
                );
            } else {
                return new Error("Schema validation failed");
            }
        }
    }

    let session: Session | null = null;

    if (authorize) {
        session = await getServerSession();

        if (!session) {
            return new UnauthorizedError();
        }
    }

    // await connectToDatabase();

    return { params, session };
}

export default action;
