"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../form-input/InputField";
import ImageInputField from "../../../form-input/ImageInputField";
import { CreateWorkspaceSchema } from "@/lib/validation";

import { useCreateProject } from "@/hooks/actions/useProjects";
import { CreateProjectSchema } from "@/lib/validation/form";
import { useParams } from "next/navigation";

interface ProjectFormProps {
    onCancel?: () => void;
    actionType: "create" | "update";
    initialValue?: Project;
}

const ProjectForm = ({
    onCancel,
    actionType,
    initialValue,
}: ProjectFormProps) => {
    const { workspaceId } = useParams();

    const createProjectMutation = useCreateProject();
    // const editWorkspaceMutation = useEditWorkspace(initialValue?._id as string);

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateProjectSchema>>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: actionType === "update" ? initialValue?.name || "" : "",
            image: actionType === "update" ? initialValue?.image || "" : "",
        },
    });

    const handleCancelForm = () => {
        form.reset();
        onCancel?.();
    };

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateProjectSchema>) {
        if (actionType === "update") {
            // editWorkspaceMutation.mutate({
            //     workspaceId: initialValue?._id as string,
            //     name: values.name,
            //     image: values.image,
            // });
        } else {
            createProjectMutation.mutate(
                {
                    workspaceId: workspaceId as string,
                    name: values.name,
                    image: values.image,
                },
                {
                    onSuccess: () => {
                        handleCancelForm();
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
                        {actionType === "create" ? "Cancel" : "Reset"}
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
