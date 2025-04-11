"use server";

// import { Account } from "next-auth";
import User from "../mongodb/models/user.model";
import accountModel from "../mongodb/models/account.model";
import { connectToDatabase } from "../mongodb/mongoose";

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
    const account = await accountModel.findOne({ userId: id });
    return account;
};
