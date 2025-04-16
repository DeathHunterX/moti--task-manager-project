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
