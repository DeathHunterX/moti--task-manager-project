"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../../../form-input/InputField";
import ImageInputField from "../../../form-input/ImageInputField";

import {
    useCreateProject,
    useEditProject,
    useGetProjects,
} from "@/hooks/actions/useProjects";
import { CreateProjectSchema } from "@/lib/validation/form";
import { useProjectId, useWorkspaceId } from "@/hooks/use-params";
import DatePickerField from "@/components/shared/form-input/DatePickerField";
import SelectInputField from "@/components/shared/form-input/SelectInputField";
import { useGetWorkspaceMembers } from "@/hooks/actions/useMembers";
import { useCreateTask } from "@/hooks/actions/useTask";
import { CreateTaskSchema } from "@/lib/validation/serverAction";

interface ProjectFormProps {
    onCancel?: () => void;
    actionType: "create" | "update";
    data?: Task;
}

const TaskForm = ({ onCancel, actionType, data }: ProjectFormProps) => {
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

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateTaskSchema>>({
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: {
            name: actionType === "update" ? data?.name || "" : "",
            status: undefined,
            workspaceId: workspaceId,
            projectId: "",
            dueDate: undefined,
            assigneeId: "",
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
            // editProjectMutation.mutate(
            //     {
            //         workspaceId: initialValue?.workspaceId as string,
            //         projectId: initialValue?._id as string,
            //         name: values.name,
            //         image: values.image,
            //     },
            //     {
            //         onSuccess: () => {
            //             onCancel?.();
            //         },
            //     }
            // );
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
                    data={[
                        { name: "Backlog", value: "BACKLOG" },
                        { name: "To Do", value: "TODO" },
                        { name: "In Progress", value: "IN_PROGRESS" },
                        { name: "In Review", value: "IN_REVIEW" },
                        { name: "Done", value: "DONE" },
                    ]}
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
                    >
                        {buttonText}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TaskForm;
