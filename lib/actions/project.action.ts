"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";
import {
    CreateProjectServerSchema,
    GetAllProjectsSchema,
    GetProjectByIdSchema,
} from "../validation/serverAction";
import ProjectModel from "../mongodb/models/project.model";
import { InternalServerError, NotFoundError } from "../http-error";
import mongoose from "mongoose";
import { uploadImage } from "./image.action";
import { revalidatePath } from "next/cache";

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

        revalidatePath("/workspaces/:id");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newProject)),
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
