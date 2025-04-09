"use server";

// import { Account } from "next-auth";
import User from "../mongodb/models/User";
import accountModel from "../mongodb/models/account.model";

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
};

export const getUserById = async (id: string) => {
    const user = await User.findOne({ _id: id });

    return user;
};

export const getAccountById = async (id: string) => {
    console.log("id", id);
    const account = await accountModel.findOne({ id: id });
    console.log("Account", account);

    return account;
};
