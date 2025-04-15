"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../form-input/InputField";
import ImageInputField from "../../../form-input/ImageInputField";
import { CreateWorkspaceSchema } from "@/lib/validation";

import { useCreateWorkspace } from "@/hooks/actions/useWorkspaces";
import { ErrorToastMsg } from "@/components/shared/Toast";

interface WorkspaceFormProps {
    onCancel?: () => void;
    actionType: "create" | "update";
    isEdit?: boolean;
}

const WorkspaceForm = ({
    onCancel,
    actionType,
    isEdit = false,
}: WorkspaceFormProps) => {
    const createWorkspaceMutation = useCreateWorkspace();

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
        resolver: zodResolver(CreateWorkspaceSchema),
        defaultValues: {
            name: "",
            image: "",
        },
    });

    const handleCancelForm = () => {
        form.reset();
        onCancel?.();
    };

    const check = () => {
        const mockErrorData = {
            title: "Error 400",
            description: "Something went wrong while creating the workspace!",
        };

        ErrorToastMsg(mockErrorData);
    };
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateWorkspaceSchema>) {
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

    const buttonText =
        actionType === "create" || !isEdit
            ? "Create workspace"
            : "Save changes";
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 my-5"
            >
                <InputField nameInSchema="name" label="Workspace Name" />

                <ImageInputField nameInSchema="image" label="Workspace Icon" />

                <Button type="button" onClick={check}>
                    Check
                </Button>
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
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default WorkspaceForm;
