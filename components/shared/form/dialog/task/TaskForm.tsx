"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "../../../form-input/InputField";
import DatePickerField from "@/components/shared/form-input/DatePickerField";
import SelectInputField from "@/components/shared/form-input/SelectInputField";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetProjects } from "@/hooks/actions/useProjects";
import { useGetWorkspaceMembers } from "@/hooks/actions/useMembers";
import { useCreateTask, useEditTask } from "@/hooks/actions/useTask";

import { useWorkspaceId } from "@/hooks/use-params";
import {
    CreateTaskSchema,
    TaskStatusEnum,
} from "@/lib/validation/serverAction";
import { statusOptions } from "@/constants";

interface ProjectFormProps {
    onCancel?: () => void;
    actionType: "create" | "update";
    initialData?: Task;
}

const TaskForm = ({ onCancel, actionType, initialData }: ProjectFormProps) => {
    const workspaceId = useWorkspaceId();

    const { data: members, isLoading: isLoadingMembers } =
        useGetWorkspaceMembers(workspaceId);
    const { data: projects, isLoading: isLoadingProjects } =
        useGetProjects(workspaceId);

    const projectOptions = projects?.map((project) => ({
        name: project.name,
        image: project.image,
        value: project._id,
    }));

    const memberOptions = members?.map((member) => ({
        name: member.name,
        value: member._id,
    }));

    const { mutate: createTaskMutation, isPending: isCreatePending } =
        useCreateTask();

    const { mutate: editTaskMutation, isPending: isEditPending } = useEditTask(
        initialData?._id || ""
    );

    const isSubmittedPending = isCreatePending || isEditPending;

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateTaskSchema>>({
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: {
            name: actionType === "update" ? initialData?.name || "" : "",
            status:
                actionType === "update"
                    ? (initialData?.status as TaskStatusEnum) || undefined
                    : undefined,
            workspaceId:
                actionType === "update"
                    ? initialData?.workspaceId || workspaceId
                    : workspaceId,
            projectId:
                actionType === "update" ? initialData?.projectId || "" : "",
            dueDate:
                actionType === "update"
                    ? initialData?.dueDate || undefined
                    : undefined,
            assigneeId:
                actionType === "update" ? initialData?.assigneeId || "" : "",
        },
    });

    const handleCancelForm = () => {
        form.reset();
        onCancel?.();
    };

    const isPending = isCreatePending;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateTaskSchema>) {
        if (actionType === "update") {
            editTaskMutation(
                {
                    taskId: initialData?._id as string,
                    name: values.name,
                    status: values.status,
                    workspaceId: workspaceId,
                    projectId: values.projectId,
                    dueDate: values.dueDate,
                    assigneeId: values.assigneeId,
                },
                {
                    onSuccess: () => {
                        onCancel?.();
                    },
                }
            );
        } else {
            createTaskMutation(
                {
                    name: values.name,
                    status: values.status,
                    workspaceId: workspaceId,
                    projectId: values.projectId,
                    dueDate: values.dueDate,
                    assigneeId: values.assigneeId,
                },
                {
                    onSuccess: () => {
                        onCancel?.();
                    },
                }
            );
        }
    }

    const buttonText = actionType === "create" ? "Create task" : "Save changes";

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 my-5"
            >
                <InputField nameInSchema="name" label="Task Name" />
                <DatePickerField nameInSchema="dueDate" label="Due Date" />
                <SelectInputField
                    nameInSchema="assigneeId"
                    label="Assignee"
                    placeholder="Select assignee"
                    isLoading={isLoadingMembers}
                    data={memberOptions || []}
                />
                <SelectInputField
                    nameInSchema="status"
                    label="Status"
                    placeholder="Select status"
                    isLoading={isLoadingMembers}
                    data={statusOptions}
                />

                <SelectInputField
                    nameInSchema="projectId"
                    label="Project"
                    placeholder="Select project"
                    isLoading={isLoadingProjects}
                    hasAvatar
                    data={projectOptions || []}
                />

                <div className="flex flex-rows justify-between gap-4">
                    <Button
                        className="px-5 py-3"
                        variant="outline"
                        type="button"
                        onClick={handleCancelForm}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-5 py-3 bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmittedPending}
                    >
                        {buttonText}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TaskForm;
