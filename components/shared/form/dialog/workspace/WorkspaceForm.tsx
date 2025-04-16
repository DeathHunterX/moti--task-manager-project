"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../form-input/InputField";
import ImageInputField from "../../../form-input/ImageInputField";
import { CreateWorkspaceSchema } from "@/lib/validation";

import {
    useCreateWorkspace,
    useEditWorkspace,
} from "@/hooks/actions/useWorkspaces";

interface WorkspaceFormProps {
    onCancel?: () => void;
    actionType: "create" | "update";
    initialValue?: Workspace;
}

const WorkspaceForm = ({
    onCancel,
    actionType,
    initialValue,
}: WorkspaceFormProps) => {
    const createWorkspaceMutation = useCreateWorkspace();
    const editWorkspaceMutation = useEditWorkspace(initialValue?._id as string);

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
        resolver: zodResolver(CreateWorkspaceSchema),
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
    async function onSubmit(values: z.infer<typeof CreateWorkspaceSchema>) {
        if (actionType === "update") {
            editWorkspaceMutation.mutate({
                workspaceId: initialValue?._id as string,
                name: values.name,
                image: values.image,
            });
        } else {
            createWorkspaceMutation.mutate(
                {
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
        actionType === "create" ? "Create workspace" : "Save changes";
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 my-5"
            >
                <InputField nameInSchema="name" label="Workspace Name" />

                <ImageInputField nameInSchema="image" label="Workspace Icon" />

                <div className="flex flex-rows justify-between gap-4">
                    <Button
                        className="px-5 py-3"
                        variant="outline"
                        type="button"
                        onClick={handleCancelForm}
                    >
                        Reset
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

export default WorkspaceForm;
