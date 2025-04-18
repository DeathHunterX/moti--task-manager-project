"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
    DeleteWorkspaceMemberSchema,
    GetWorkspaceMembersSchema,
    GrantRoleWorkspaceMemberSchema,
} from "../validation/serverAction";
import MemberModel from "../mongodb/models/member.model";
import { NotFoundError } from "../http-error";
import mongoose from "mongoose";
import { checkAdminRole } from "./queries.action";

export const getWorkspaceMembers = async (
    params: GetWorkspaceMembersParams
): Promise<ActionResponse<Member[]>> => {
    const validationResult = await action({
        params,
        schema: GetWorkspaceMembersSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId } = validationResult.params!;

    try {
        const pipeline: any[] = [
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "info",
                },
            },
            {
                $unwind: {
                    path: "$info",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    workspaceId: new mongoose.Types.ObjectId(workspaceId!),
                },
            },
            {
                $project: {
                    name: "$info.name",
                    image: "$info.image",
                    workspaceId: 1,
                    role: 1,
                    userId: 1,
                },
            },
        ];
        const members = await MemberModel.aggregate(pipeline);

        if (!members) {
            throw new NotFoundError("Failed to get workspace members!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(members)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const isWorkspaceMember = async (
    params: GetWorkspaceMembersParams
): Promise<ActionResponse<Member>> => {
    const validationResult = await action({
        params,
        schema: GetWorkspaceMembersSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId } = validationResult.params!;
    const userId = validationResult.session?.user.id!;

    try {
        const pipeline: any[] = [
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "info",
                },
            },
            {
                $unwind: {
                    path: "$info",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    workspaceId: new mongoose.Types.ObjectId(workspaceId!),
                    userId: new mongoose.Types.ObjectId(userId!),
                },
            },
            {
                $project: {
                    name: "$info.name",
                    image: "$info.image",
                    workspaceId: 1,
                    role: 1,
                    userId: 1,
                },
            },
        ];
        const [member] = await MemberModel.aggregate(pipeline);

        if (!member) {
            throw new NotFoundError("Failed to get current data!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(member)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const grantRoleWorkspaceMember = async (
    params: GrantRoleWorkspaceMemberParams
): Promise<ActionResponse<Member>> => {
    const validationResult = await action({
        params,
        schema: GrantRoleWorkspaceMemberSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, memberId, role } = validationResult.params!;

    const userId = validationResult.session?.user.id!;

    try {
        checkAdminRole(workspaceId, userId);

        const member = await MemberModel.findOneAndUpdate(
            { userId: memberId },
            {
                role,
            },
            { new: true }
        );

        if (!member) {
            throw new NotFoundError("Failed to get workspace members!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(member)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const deleteWorkspaceMember = async (
    params: DeleteWorkspaceMemberParams
): Promise<ActionResponse> => {
    const validationResult = await action({
        params,
        schema: DeleteWorkspaceMemberSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, memberId } = validationResult.params!;
    const userId = validationResult.session?.user.id!;

    try {
        const currentMember = await MemberModel.findOne({ userId: memberId });

        await checkAdminRole(workspaceId, userId);

        if (memberId === userId && currentMember.role === "ADMIN") {
            throw new Error("You cannot remove yourself out of workspace!");
        }

        const member = await MemberModel.findOneAndDelete({
            userId: memberId,
            workspaceId,
            role: "MEMBER",
        });

        if (!member) {
            throw new NotFoundError(
                "Failed to remove a member from workspace!"
            );
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(member)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
