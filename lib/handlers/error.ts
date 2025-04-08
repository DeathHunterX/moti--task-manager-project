import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-error";

export type ResponseType = "api" | "server";

const formatResponse = (
    responseType: ResponseType,
    status: number,
    message: string,
    errors?: Record<string, string[]> | undefined
) => {
    const responseContent = {
        success: false,
        error: {
            message,
            details: errors,
        },
    };

    // Customize response based on the framework
    switch (responseType) {
        case "api": // Next.js API route
            return NextResponse.json(responseContent, { status });

        default:
            return { ...responseContent, status }; // Default case to handle others
    }
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
    if (error instanceof RequestError) {
        return formatResponse(
            responseType,
            error.statusCode,
            error.message,
            error.errors
        );
    }
    if (error instanceof ZodError) {
        const validationError = new ValidationError(
            error.flatten().fieldErrors as Record<string, string[]>
        );

        console.error(
            { err: error },
            `Validation Error: ${validationError.message}`
        );

        return formatResponse(
            responseType,
            validationError.statusCode,
            validationError.message,
            validationError.errors
        );
    }
    if (error instanceof Error) {
        console.error(error.message);
        return formatResponse(responseType, 500, error.message);
    }
    console.error({ error: error }, "An unexpected error occured");
    return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;
