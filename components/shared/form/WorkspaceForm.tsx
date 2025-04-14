"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ReactNode } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../form-input/InputField";
import ImageInputField from "../form-input/ImageInputField";
import { CreateWorkspaceSchema } from "@/lib/validation";
import { createWorkspace } from "@/lib/actions/workspace.action";
import { toast } from "react-toastify";

interface WorkspaceFormProps {
    trigger: ReactNode;
}

const WorkspaceForm = ({ trigger }: WorkspaceFormProps) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
        resolver: zodResolver(CreateWorkspaceSchema),
        defaultValues: {
            name: "",
            image: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateWorkspaceSchema>) {
        const result = await createWorkspace({
            name: values.name,
            image: values.image,
        });

        if (result.status) {
            toast.success("Successfully create a workspace!");
        } else {
            toast.error(
                result.error?.message || "Failed to create a workspace!"
            );
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a workspace</DialogTitle>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 my-5"
                        >
                            <InputField
                                nameInSchema="name"
                                label="Workspace Name"
                            />

                            <ImageInputField
                                nameInSchema="image"
                                label="Workspace Icon"
                            />

                            <Button
                                type="submit"
                                className="flex flex-row justify-end"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceForm;
