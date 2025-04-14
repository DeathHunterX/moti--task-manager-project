"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";
import {
    CreateWorkspaceSchema,
    PaginatedSearchParamsSchema,
} from "../validation";
import { uploadImage } from "./image.action";

import WorkspaceModel from "../mongodb/models/workspace.models";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

export const createWorkspace = async (
    params: CreateWorkspaceParams
): Promise<ActionResponse> => {
    try {
        const validationResult = await action({
            params,
            schema: CreateWorkspaceSchema,
            authorize: true,
        });

        if (validationResult instanceof Error) {
            return handleError(validationResult) as ErrorResponse;
        }

        const { name, image } = validationResult.params!;
        const userId = validationResult.session?.user.id!;

        const handleUploadImg =
            image instanceof File ? await uploadImage(image) : null;

        const newWorkspace = await WorkspaceModel.create({
            name,
            image: handleUploadImg?.data?.url || image,
            userId,
        });

        if (!newWorkspace) {
            throw new Error("Failed to create workspace");
        }

        revalidatePath("/workspaces");
        revalidatePath("/your-work");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newWorkspace)),
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const getAllWorkspace = async (
    params: PaginatedSearchParams
): Promise<ActionResponse<{ workspaces: Workspace[]; isNext: boolean }>> => {
    const validationResult = await action({
        params,
        schema: PaginatedSearchParamsSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const userId = validationResult.session?.user?.id;
    const { page = 1, pageSize = 10, query, filter } = validationResult.params!;

    const skip = (Number(page) - 1) * pageSize;
    const limit = pageSize;

    const filterQuery: FilterQuery<typeof WorkspaceModel> = {};

    try {
        const totalWorkspace = await WorkspaceModel.countDocuments(filterQuery);

        const workspaces = await WorkspaceModel.find({
            ...filterQuery,
            userId,
        })
            .lean()
            .skip(skip)
            .limit(limit);

        const isNext = totalWorkspace > skip + workspaces.length;

        return {
            success: true,
            data: {
                workspaces: JSON.parse(JSON.stringify(workspaces)),
                isNext,
            },
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
