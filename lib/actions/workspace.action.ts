"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";
import {
    CreateWorkspaceSchema,
    PaginatedSearchParamsSchema,
    UpdateWorkspaceSchema,
} from "../validation";
import {
    DeleteWorkspaceSchema,
    GetWorkspaceByIdSchema,
    JoinWorkspaceByInviteCodeSchema,
    ResetInvitationCodeByWorkspaceIdSchema,
} from "../validation/serverAction";

import mongoose, { FilterQuery } from "mongoose";
import WorkspaceModel from "../mongodb/models/workspace.models";
import MemberModel from "../mongodb/models/member.model";
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from "../http-error";

import { generateInviteCode, getCloudinaryPublicId } from "../utils";
import { revalidatePath } from "next/cache";
import { deleteImage, uploadImage } from "./image.action";
import { checkAdminRole } from "./queries.action";

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
            throw new InternalServerError("Failed to create workspace");
        }

        const [newMember] = await MemberModel.create(
            [
                {
                    userId,
                    workspaceId: newWorkspace._id,
                    role: "ADMIN",
                },
            ],
            { session, new: true }
        );

        if (!newMember) {
            throw new InternalServerError(
                "Failed to provide admin role in this workspace!"
            );
        }

        // *End transaction
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

export const getAllWorkspaces = async (
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

    const objectUserId = new mongoose.Types.ObjectId(userId!);

    try {
        const pipeline: any[] = [
            {
                $lookup: {
                    from: "members",
                    localField: "_id",
                    foreignField: "workspaceId",
                    as: "memberInfo",
                },
            },
            {
                $unwind: "$memberInfo", // ← Flatten the memberInfo array
            },
            {
                $match: {
                    "memberInfo.userId": objectUserId,
                    "memberInfo.role": { $in: ["MEMBER", "ADMIN"] },
                },
            },
        ];

        if (query) {
            pipeline.push({
                $match: {
                    name: { $regex: query, $options: "i" },
                },
            });
        }

        pipeline.push({ $skip: skip }, { $limit: limit + 1 }); // fetch one extra for "isNext"

        const workspaces = await WorkspaceModel.aggregate(pipeline);

        const isNext = workspaces.length > pageSize;
        const trimmedWorkspaces = isNext
            ? workspaces.slice(0, pageSize)
            : workspaces;

        if (!workspaces) {
            throw new Error("Failed to get all workspaces available!");
        }

        return {
            success: true,
            data: {
                workspaces: JSON.parse(JSON.stringify(trimmedWorkspaces)),
                isNext,
            },
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const getWorkspaceById = async (
    params: GetWorkspaceByIdParams
): Promise<ActionResponse<Workspace>> => {
    const validationResult = await action({
        params,
        schema: GetWorkspaceByIdSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId } = validationResult.params!;

    try {
        const workspace = await WorkspaceModel.findOne({
            _id: workspaceId,
        });

        if (!workspace) {
            throw new Error("Failed to get workspace!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(workspace)),
            status: 200,
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

    // *Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await checkAdminRole(workspaceId, userId);

        const existingWorkspace = await WorkspaceModel.findById(workspaceId);

        if (!existingWorkspace) {
            throw new NotFoundError("Workspace not found!");
        }

        // Check if the image has changed

        // Handle image field based on the specified cases
        let updatedImage = existingWorkspace.image; // Default to the existing image

        if (image instanceof File) {
            // Case 1: Image field doesn't have value, upload image => add it
            // Case 3: Image field has value, changes image => add new image and remove old one
            const handleUploadImg = await uploadImage(image);
            updatedImage = handleUploadImg?.data?.url || "";

            // If the existing workspace has an image, delete it
            if (existingWorkspace.image) {
                const deleteOldImg = await deleteImage({
                    params: {
                        public_id: getCloudinaryPublicId(
                            existingWorkspace.image as string
                        ),
                    },
                });
                if (!deleteOldImg.success) {
                    throw new InternalServerError(
                        "Failed to delete old image!"
                    );
                }
            }
        } else if (typeof image === "string") {
            if (image === "") {
                // Case 5: Image field has value, remove it => remove old one, update image field to empty string
                if (existingWorkspace.image) {
                    const deleteOldImg = await deleteImage({
                        params: {
                            public_id: getCloudinaryPublicId(
                                existingWorkspace.image as string
                            ),
                        },
                    });
                    if (!deleteOldImg.success) {
                        throw new Error("Failed to delete old image!");
                    }
                }
                updatedImage = ""; // Set the image field to an empty string
            } else if (image !== existingWorkspace.image) {
                // Case 3: Image field has value, changes image => add new image and remove old one
                updatedImage = image;

                if (existingWorkspace.image) {
                    const deleteOldImg = await deleteImage(
                        existingWorkspace.image
                    );
                    if (!deleteOldImg.success) {
                        throw new Error("Failed to delete old image!");
                    }
                }
            }
            // Case 4: Image field has value, no changes => skip (do nothing)
        }

        // Case 2: Image field doesn't have value, no changes => skip (do nothing)

        // Update the workspace
        const editedWorkspace = await WorkspaceModel.findOneAndUpdate(
            { _id: workspaceId },
            {
                name,
                image: updatedImage,
            },
            { session, new: true }
        );

        // *End transaction
        await session.commitTransaction();

        revalidatePath("/workspaces");
        revalidatePath("/workspaces/:id");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(editedWorkspace)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const deleteWorkspace = async (
    params: DeleteWorkspaceParams
): Promise<ActionResponse<Workspace>> => {
    const validationResult = await action({
        params,
        schema: DeleteWorkspaceSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId } = validationResult.params!;
    const userId = validationResult.session?.user.id!;

    // *Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await checkAdminRole(workspaceId, userId);

        const workspace = await WorkspaceModel.findOneAndDelete(
            {
                _id: workspaceId,
                userId,
            },
            { session }
        );

        await MemberModel.findOneAndDelete(
            {
                workspaceId: workspaceId,
            },
            { session }
        );

        await session.commitTransaction();

        revalidatePath("/workspaces");
        revalidatePath("/your-work");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(workspace)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const resetInviteCode = async (
    params: ResetInvitationCodeByWorkspaceIdParams
): Promise<ActionResponse> => {
    const validationResult = await action({
        params,
        schema: ResetInvitationCodeByWorkspaceIdSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId } = validationResult.params!;
    const userId = validationResult.session?.user.id!;

    try {
        await checkAdminRole(workspaceId, userId);

        const workspace = await WorkspaceModel.findOneAndUpdate(
            { _id: workspaceId },
            {
                inviteCode: generateInviteCode(6),
            }
        );

        revalidatePath("/workspaces/:id");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(workspace)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const joinWorkspaceByInviteCode = async (
    params: JoinWorkspaceByInviteCodeParams
): Promise<ActionResponse> => {
    const validationResult = await action({
        params,
        schema: JoinWorkspaceByInviteCodeSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, inviteCode } = validationResult.params!;
    const userId = validationResult.session?.user.id!;

    try {
        const workspace = await WorkspaceModel.findOne({ _id: workspaceId });

        if (workspace?.inviteCode !== inviteCode) {
            throw new BadRequestError("Invalid invite code!");
        }

        const [newMember] = await MemberModel.create([
            {
                userId,
                workspaceId: workspace._id,
                role: "MEMBER",
            },
        ]);

        if (!newMember) {
            throw new InternalServerError("Failed to add a member");
        }

        revalidatePath("/workspaces");
        revalidatePath("/your-work");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newMember)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
