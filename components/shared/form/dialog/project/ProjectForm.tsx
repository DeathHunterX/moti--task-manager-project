"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../form-input/InputField";
import ImageInputField from "../../../form-input/ImageInputField";

import { useCreateProject, useEditProject } from "@/hooks/actions/useProjects";
import { CreateProjectSchema } from "@/lib/validation/form";
import { useProjectId, useWorkspaceId } from "@/hooks/use-params";

interface ProjectFormProps {
    onCancel?: () => void;
    actionType: "create" | "update";
    initialData?: Project;
}

const ProjectForm = ({
    onCancel,
    actionType,
    initialData,
}: ProjectFormProps) => {
    const projectId = useProjectId();
    const workspaceId = useWorkspaceId();

    const createProjectMutation = useCreateProject();
    const editProjectMutation = useEditProject(projectId);

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateProjectSchema>>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: actionType === "update" ? initialData?.name || "" : "",
            image: actionType === "update" ? initialData?.image || "" : "",
        },
    });

    const handleCancelForm = () => {
        form.reset();
        onCancel?.();
    };

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateProjectSchema>) {
        if (actionType === "update") {
            editProjectMutation.mutate(
                {
                    workspaceId: initialData?.workspaceId as string,
                    projectId: initialData?._id as string,
                    name: values.name,
                    image: values.image,
                },
                {
                    onSuccess: () => {
                        onCancel?.();
                    },
                }
            );
        } else {
            createProjectMutation.mutate(
                {
                    workspaceId: workspaceId as string,
                    name: values.name,
                    image: values.image ?? "",
                },
                {
                    onSuccess: () => {
                        onCancel?.();
                    },
                }
            );
        }
    }

    const buttonText =
        actionType === "create" ? "Create project" : "Save changes";
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 my-5"
            >
                <InputField nameInSchema="name" label="Project Name" />

                <ImageInputField nameInSchema="image" label="Project Icon" />

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

export default ProjectForm;
