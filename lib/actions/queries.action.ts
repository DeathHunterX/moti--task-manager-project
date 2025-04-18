"use server";

// import { Account } from "next-auth";
import User from "../mongodb/models/user.model";
import AccountModel from "../mongodb/models/account.model";
import MemberModel from "../mongodb/models/member.model";

import { connectToDatabase } from "../mongodb/mongoose";
import { UnauthorizedError } from "../http-error";

export const getUserByEmail = async (email: string) => {
    await connectToDatabase();
    const user = await User.findOne({ email });

    return user;
};

export const getUserById = async (id: string) => {
    await connectToDatabase();
    const user = await User.findOne({ _id: id });

    return user;
};

export const getAccountById = async (id: string) => {
    await connectToDatabase();
    const account = await AccountModel.findOne({ userId: id });
    return account;
};

/**
 * Checks if the user has an admin role for the specified workspace.
 * @param workspaceId - The ID of the workspace.
 * @param userId - The ID of the user.
 * @throws UnauthorizedError if the user is not an admin.
 */
export const checkAdminRole = async (
    workspaceId: string,
    userId: string
): Promise<void> => {
    const member = await MemberModel.findOne({ workspaceId, userId });

    if (!member || member.role !== "ADMIN") {
        throw new UnauthorizedError(
            "Unauthorized! You don't have permission to access this workspace!"
        );
    }
};

export const checkMembers = async (
    workspaceId: string,
    userId: string
): Promise<void> => {
    const member = await MemberModel.findOne({ workspaceId, userId });

    if (!member) {
        throw new UnauthorizedError(
            "Unauthorized! You don't have permission to access this workspace!"
        );
    }
};
