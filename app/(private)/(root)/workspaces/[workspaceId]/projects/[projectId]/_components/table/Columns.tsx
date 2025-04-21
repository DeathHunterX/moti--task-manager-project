"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectAvatar from "@/components/shared/avatar/ProjectAvatar";
import TaskDate from "./TaskDate";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskStatusEnum } from "@/lib/validation/serverAction";
import DataActions from "./DataAction";
import { MemberAvatar } from "@/components/shared/avatar/MemberAvatar";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.original.name;

            return <p className="line-clamp-1">{name}</p>;
        },
    },
    {
        accessorKey: "project",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Project
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const project = row.original.project;

            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <ProjectAvatar
                        className="size-6"
                        name={project?.name as string}
                        image={project?.image as string}
                    />
                    <span className="text-md font-medium">{project?.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "assignee",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Asignee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const assignee = row.original.assignee;

            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <MemberAvatar
                        className="size-6"
                        name={assignee?.name as string}
                    />
                    <span className="text-md font-medium">
                        {assignee?.name}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Due Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const dueDate = row.original.dueDate;

            return <TaskDate value={new Date(dueDate).toISOString() || ""} />;
        },
    },

    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.original.status;

            return (
                <Badge variant={status as TaskStatusEnum}>
                    {snakeCaseToTitleCase(status)}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original._id;
            const projectId = row.original.projectId;

            return (
                <DataActions id={id} projectId={projectId}>
                    <Button
                        variant="ghost"
                        className="size-8 p-0 cursor-pointer"
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </DataActions>
            );
        },
    },
];
