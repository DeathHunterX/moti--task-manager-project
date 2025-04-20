"use server";

import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";
import {
    CreateTaskSchema,
    DeleteTaskSchema,
    EditTaskSchema,
    GetTaskByIdSchema,
    GetTasksSchema,
} from "../validation/serverAction";
import TaskModel from "../mongodb/models/task.model";
import { checkMembers } from "./queries.action";
import { BadRequestError, NotFoundError } from "../http-error";
import ProjectModel from "../mongodb/models/project.model";
import MemberModel from "../mongodb/models/member.model";
import UserModel from "../mongodb/models/user.model";

export const createTask = async (
    params: CreateTaskParams
): Promise<ActionResponse<Task>> => {
    const validationResult = await action({
        params,
        schema: CreateTaskSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const {
        workspaceId,
        name,
        projectId,
        assigneeId,
        description,
        dueDate,
        status,
    } = validationResult.params!;

    const userId = validationResult.session?.user.id!;
    try {
        await checkMembers(workspaceId, userId);

        const highestPositionTask = await TaskModel.find({
            status,
            workspaceId,
        })
            .sort({ position: "asc" })
            .limit(1);
        const newPosition =
            highestPositionTask.length > 0
                ? highestPositionTask[0].position + 1000
                : 1000;

        const newTask = await TaskModel.create({
            workspaceId,
            name,
            projectId,
            assigneeId,
            description,
            dueDate,
            status,
            position: newPosition,
        });

        if (!newTask) {
            throw new BadRequestError("Failed to create a task!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newTask)),
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const getTasks = async (
    params: GetTasksParams
): Promise<ActionResponse<Task>> => {
    const validationResult = await action({
        params,
        schema: GetTasksSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId, projectId, assigneeId, status, search, dueDate } =
        validationResult.params!;
    const userId = validationResult.session?.user.id!;

    try {
        await checkMembers(workspaceId, userId);

        const filter: any = { workspaceId };

        if (projectId) filter.projectId = projectId;
        if (assigneeId) filter.assigneeId = assigneeId;
        if (status) filter.status = status;
        if (dueDate) filter.dueDate = dueDate;
        if (search) filter.name = new RegExp(search, "i");

        const tasks = await TaskModel.find(filter).sort({ createdAt: -1 });

        const projectIds = tasks.map((t) => t.projectId).filter(Boolean);
        const assigneeIds = tasks.map((t) => t.assigneeId).filter(Boolean);

        const [projects, members] = await Promise.all([
            projectIds.length
                ? ProjectModel.find({ _id: { $in: projectIds } })
                : [],
            assigneeIds.length
                ? MemberModel.find({ _id: { $in: assigneeIds } })
                : [],
        ]);

        const userIds = members.map((m) => m.userId);
        const users = await UserModel.find({ _id: { $in: userIds } });

        const assignees = members.map((member) => {
            const user = users.find((u) => u._id.equals(member.userId));
            return {
                ...member.toObject(),
                name: user?.name || user?.email,
                email: user?.email,
            };
        });

        const populatedTasks = tasks.map((task) => {
            const project = projects.find((p) => p._id.equals(task.projectId));
            const assignee = assignees.find((a) =>
                a._id.equals(task.assigneeId)
            );
            return {
                ...task.toObject(),
                project,
                assignee,
            };
        });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(populatedTasks)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const getTaskById = async (
    params: GetTaskByIdParams
): Promise<ActionResponse<Task>> => {
    const validationResult = await action({
        params,
        schema: GetTaskByIdSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { taskId } = validationResult.params!;

    try {
        const task = await TaskModel.findOne({
            _id: taskId,
        });

        if (!task) {
            throw new NotFoundError("Failed to get task!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(task)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const editTask = async (
    params: EditTaskParams
): Promise<ActionResponse<Task>> => {
    const validationResult = await action({
        params,
        schema: EditTaskSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const {
        taskId,
        workspaceId,
        name,
        projectId,
        assigneeId,
        description,
        dueDate,
        status,
    } = validationResult.params!;

    const userId = validationResult.session?.user.id!;

    try {
        await checkMembers(workspaceId, userId);

        const task = await TaskModel.findOneAndUpdate(
            { _id: taskId, workspaceId: workspaceId },
            {
                workspaceId,
                name,
                projectId,
                assigneeId,
                description,
                dueDate,
                status,
            }
        );

        if (!task) {
            throw new NotFoundError("Failed to edit a task!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(task)),
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const deleteTask = async (
    params: DeleteTaskParams
): Promise<ActionResponse<Task>> => {
    const validationResult = await action({
        params,
        schema: DeleteTaskSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { taskId, workspaceId } = validationResult.params!;

    const userId = validationResult.session?.user.id!;

    try {
        await checkMembers(workspaceId, userId);

        const task = await TaskModel.findOneAndDelete({
            _id: taskId,
            workspaceId: workspaceId,
        });

        if (!task) {
            throw new NotFoundError("Failed to remove a task!");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(task)),
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
