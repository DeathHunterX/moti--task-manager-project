"use server";

// import { Account } from "next-auth";
import User from "../mongodb/models/user.model";
import accountModel from "../mongodb/models/account.model";

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });

    return user;
};

export const getUserById = async (id: string) => {
    const user = await User.findById(id);

    return user;
};

export const getAccountById = async (id: string) => {
    const account = await accountModel.findOne({ userId: id });
    return account;
};
