"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";
import {
    CreateWorkspaceSchema,
    PaginatedSearchParamsSchema,
    UpdateWorkspaceSchema,
} from "../validation";
import { deleteImage, uploadImage } from "./image.action";

import WorkspaceModel from "../mongodb/models/workspace.models";
import { revalidatePath } from "next/cache";
import mongoose, { FilterQuery } from "mongoose";
import MemberModel from "../mongodb/models/member.model";
import { generateInviteCode } from "../utils";
import { UnauthorizedError } from "../http-error";

export const createWorkspace = async (
    params: CreateWorkspaceParams
): Promise<ActionResponse> => {
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

    // *Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    console.log("image: ", image);
    try {
        const handleUploadImg =
            image instanceof File ? await uploadImage(image) : null;

        const [newWorkspace] = await WorkspaceModel.create(
            [
                {
                    name,
                    image: handleUploadImg?.data?.url || "",
                    userId,
                    inviteCode: generateInviteCode(6),
                },
            ],
            { session }
        );

        if (!newWorkspace) {
            throw new Error("Failed to create workspace");
        }

        const newMember = await MemberModel.create(
            {
                userId,
                workspaceId: newWorkspace._id,
                role: "ADMIN",
            },
            { session }
        );

        if (!newMember) {
            throw new Error("Failed to provide admin role in this workspace!");
        }

        await session.commitTransaction();

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

export const editWorkspace = async (
    params: EditWorkspaceParams
): Promise<ActionResponse<Workspace>> => {
    const validationResult = await action({
        params,
        schema: UpdateWorkspaceSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, name, image } = validationResult.params!;
    const userId = validationResult.session?.user.id!;
    /**
     * TODO:
     * - Check admin priviledge
     * - Check image has changed, if there are any changed, upload new pic and remove old one, else pass it
     * */

    try {
        const member = await MemberModel.findOne({ workspaceId, userId });

        if (!member || member?.role !== "ADMIN") {
            throw new UnauthorizedError(
                "Unauthorized! You don't have permission to access it!"
            );
        }

        const existingWorkspace = await WorkspaceModel.findById(workspaceId);

        if (!existingWorkspace) {
            throw new Error("Workspace not found!");
        }

        // Check if the image has changed
        let updatedImage = existingWorkspace.image; // Default to the existing image
        if (image instanceof File) {
            // If the new image is a file, upload it
            const handleUploadImg = await uploadImage(image);
            updatedImage = handleUploadImg?.data?.url || "";

            const deleteOldImg = await deleteImage(existingWorkspace.image);
            if (!deleteOldImg.success) {
                throw new Error("Failed to delete old image!");
            }
        } else if (
            typeof image === "string" &&
            image !== existingWorkspace.image
        ) {
            // If the new image is a string and different from the existing one
            updatedImage = image;
        }

        // Update the workspace
        existingWorkspace.name = name;
        existingWorkspace.image = updatedImage;

        await existingWorkspace.save();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(existingWorkspace)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
