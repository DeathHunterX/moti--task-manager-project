"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";
import { GetUserAccountSchema } from "../validation/serverAction";

// Model
import UserModel from "../mongodb/models/user.model";

export const getUserAccount = async (): Promise<ActionResponse> => {
    const validationResult = await action({
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }
    const userId = validationResult.session?.user.id!;

    try {
        const userInfo = await UserModel.findOne({ _id: userId });

        if (!userInfo) {
            throw new Error("Failed to get user!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(userInfo)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
