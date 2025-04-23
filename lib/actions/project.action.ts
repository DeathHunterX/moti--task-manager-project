"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";
import {
    CreateProjectServerSchema,
    DeleteProjectByIdSchema,
    EditProjectByIdSchema,
    GetAllProjectsSchema,
    GetProjectByIdSchema,
} from "../validation/serverAction";
import ProjectModel from "../mongodb/models/project.model";
import { InternalServerError, NotFoundError } from "../http-error";
import mongoose from "mongoose";
import { deleteImage, uploadImage } from "./image.action";

import { getCloudinaryPublicId } from "../utils";
import { checkMembers } from "./queries.action";
import TaskModel from "../mongodb/models/task.model";

export const getAllProjects = async (
    params: GetAllProjectsParams
): Promise<ActionResponse<Project[]>> => {
    const validationResult = await action({
        params,
        schema: GetAllProjectsSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId } = validationResult.params!;

    try {
        const projects = await ProjectModel.find({ workspaceId });

        if (!projects) {
            throw new NotFoundError("Failed to get all projects!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(projects)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const getProjectById = async (
    params: GetProjectByIdParams
): Promise<ActionResponse<Project>> => {
    const validationResult = await action({
        params,
        schema: GetProjectByIdSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, projectId } = validationResult.params!;

    try {
        const project = await ProjectModel.findOne({
            _id: projectId,
            workspaceId,
        });

        if (!project) {
            throw new NotFoundError("Failed to get all projects!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(project)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const createProject = async (
    params: CreateProjectParams
): Promise<ActionResponse<Project>> => {
    const validationResult = await action({
        params,
        schema: CreateProjectServerSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, name, image } = validationResult.params!;

    // *Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const handleUploadImg =
            image instanceof File ? await uploadImage(image) : null;

        const [newProject] = await ProjectModel.create(
            [
                {
                    workspaceId,
                    name,
                    image: handleUploadImg?.data?.url || "",
                },
            ],
            { session }
        );

        if (!newProject) {
            throw new InternalServerError("Failed to create project");
        }

        // *End transaction
        await session.commitTransaction();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newProject)),
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const editProject = async (
    params: EditProjectParams
): Promise<ActionResponse<Project>> => {
    const validationResult = await action({
        params,
        schema: EditProjectByIdSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, projectId, name, image } = validationResult.params!;
    const userId = validationResult.session?.user.id!;
    /**
     * TODO:
     * - Check image has changed, if there are any changed, upload new pic and remove old one, else pass it
     * */

    // *Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const existingProject = await ProjectModel.findById(projectId);

        if (!existingProject) {
            throw new NotFoundError("Project not found!");
        }

        // Check if the image has changed

        // Handle image field based on the specified cases
        let updatedImage = existingProject.image; // Default to the existing image

        if (image instanceof File) {
            // Case 1: Image field doesn't have value, upload image => add it
            // Case 3: Image field has value, changes image => add new image and remove old one
            const handleUploadImg = await uploadImage(image);
            updatedImage = handleUploadImg?.data?.url || "";

            // If the existing workspace has an image, delete it
            if (existingProject.image) {
                const deleteOldImg = await deleteImage({
                    params: {
                        public_id: getCloudinaryPublicId(
                            existingProject.image as string
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
                if (existingProject.image) {
                    const deleteOldImg = await deleteImage({
                        params: {
                            public_id: getCloudinaryPublicId(
                                existingProject.image as string
                            ),
                        },
                    });
                    if (!deleteOldImg.success) {
                        throw new Error("Failed to delete old image!");
                    }
                }
                updatedImage = ""; // Set the image field to an empty string
            } else if (image !== existingProject.image) {
                // Case 3: Image field has value, changes image => add new image and remove old one
                updatedImage = image;

                if (existingProject.image) {
                    const deleteOldImg = await deleteImage(
                        existingProject.image
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
        const editedProject = await ProjectModel.findOneAndUpdate(
            { _id: projectId, workspaceId },
            {
                name,
                image: updatedImage,
            },
            { session, new: true }
        );

        if (!editedProject) {
            throw new InternalServerError("Failed to edit project!");
        }

        // *End transaction
        await session.commitTransaction();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(editedProject)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const deleteProject = async (
    params: DeleteProjectParams
): Promise<ActionResponse<Project>> => {
    const validationResult = await action({
        params,
        schema: DeleteProjectByIdSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, projectId } = validationResult.params!;

    const userId = validationResult.session?.user.id!;

    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        await checkMembers(workspaceId, userId);

        const project = await ProjectModel.findOneAndDelete(
            {
                _id: projectId,
                workspaceId: workspaceId,
            },
            { session }
        );

        if (!project) {
            throw new NotFoundError("Failed to remove a project!");
        }

        const tasks = await TaskModel.deleteMany(
            {
                projectId: project._id,
            },
            { session }
        );

        if (!tasks) {
            throw new NotFoundError("Failed to remove tasks!");
        }

        // Delete the image if it exists
        if (project.image) {
            const deleteImg = await deleteImage({
                params: {
                    public_id: getCloudinaryPublicId(project.image as string),
                },
            });
            if (!deleteImg.success) {
                throw new InternalServerError("Failed to delete image!");
            }
        }

        // *End transaction
        await session.commitTransaction();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(project)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
