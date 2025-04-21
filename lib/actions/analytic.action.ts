"use server";
import { ActionResponse, ErrorResponse } from "@/types/server";
import handleError from "../handlers/error";
import action from "../handlers/action";

import {
    GetProjectAnalyticsSchema,
    GetWorkspaceAnalyticsSchema,
} from "../validation/serverAction";

import ProjectModel from "../mongodb/models/project.model";
import MemberModel from "../mongodb/models/member.model";
import { checkMembers } from "./queries.action";

import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import TaskModel from "../mongodb/models/task.model";
import { Types } from "mongoose";
import { UnauthorizedError } from "../http-error";

export const getProjectAnalytics = async (
    params: GetProjectAnalyticsParams
): Promise<ActionResponse<ProjectAnalytics>> => {
    const validationResult = await action({
        params,
        schema: GetProjectAnalyticsSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { projectId } = validationResult.params!;
    const userId = validationResult.session?.user.id!;

    try {
        const project = await ProjectModel.findOne({ _id: projectId });

        const member = await MemberModel.findOne({
            workspaceId: project.workspaceId,
            userId,
        });

        if (!member) {
            throw new UnauthorizedError(
                "Unauthorized! You don't have permission to access this workspace!"
            );
        }

        const now = new Date();
        const thisMonthStart = startOfMonth(now);
        const thisMonthEnd = endOfMonth(now);
        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));

        const baseMatch = {
            projectId: projectId,
        };

        const getCount = async (
            match: Record<string, any>
        ): Promise<number> => {
            return TaskModel.countDocuments({ ...baseMatch, ...match });
        };

        const getStats = async (match: Record<string, any>) => {
            const thisMonth = await getCount({
                ...match,
                createdAt: { $gte: thisMonthStart, $lte: thisMonthEnd },
            });

            const lastMonth = await getCount({
                ...match,
                createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
            });

            return {
                count: thisMonth,
                difference: thisMonth - lastMonth,
            };
        };

        const taskStats = await Promise.all([
            getStats({}),
            getStats({ assigneeId: member._id }),
            getStats({ status: { $ne: "DONE" } }),
            getStats({ status: "DONE" }),
            getStats({ status: { $ne: "DONE" }, dueDate: { $lt: now } }),
        ]);

        const [
            { count: taskCount, difference: taskDifference },
            { count: assignedTaskCount, difference: assignedTaskDifference },
            {
                count: incompleteTaskCount,
                difference: incompleteTaskDifference,
            },
            { count: completedTaskCount, difference: completedTaskDifference },
            { count: overdueTaskCount, difference: overdueTaskDifference },
        ] = taskStats;

        return {
            success: true,
            data: JSON.parse(
                JSON.stringify({
                    taskCount,
                    taskDifference,
                    assignedTaskCount,
                    assignedTaskDifference,
                    completedTaskCount,
                    completedTaskDifference,
                    incompleteTaskCount,
                    incompleteTaskDifference,
                    overdueTaskCount,
                    overdueTaskDifference,
                })
            ),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const getWorkspaceAnalytics = async (
    params: GetWorkspaceAnalyticsParams
): Promise<ActionResponse<Workspace>> => {
    const validationResult = await action({
        params,
        schema: GetWorkspaceAnalyticsSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { workspaceId } = validationResult.params!;
    const userId = validationResult.session?.user.id!;

    try {
        return { success: true, status: 200 };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
