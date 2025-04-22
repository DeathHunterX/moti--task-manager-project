"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEditTask } from "@/hooks/actions/useTasks";
import { PencilIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

interface TaskDescriptionProps {
    data: Task;
}

const TaskDescription = ({ data }: TaskDescriptionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(data.description);

    const { mutate, isPending } = useEditTask(data._id);

    const handleSaveDescription = () => {
        mutate(
            {
                ...data,
                description: value,
                taskId: data._id,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };
    return (
        <div className="">
            <div className="flex items-center justify-between">
                <p className="text-base font-semibold">Description</p>
                <Button
                    onClick={() => setIsEditing((prev) => !prev)}
                    size="sm"
                    variant="secondary"
                >
                    {isEditing ? (
                        <XIcon className="size-4 mr-2" />
                    ) : (
                        <PencilIcon className="size-4 mr-2" />
                    )}
                    {isEditing ? "Cancel" : "Edit"}
                </Button>
            </div>
            <Separator className="my-4" />
            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea
                        placeholder="Add a description..."
                        value={value}
                        rows={4}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={isPending}
                    />
                    <Button
                        size="sm"
                        className="w-fit ml-auto"
                        onClick={handleSaveDescription}
                        disabled={isPending}
                    >
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            ) : (
                <div className="block">
                    {data.description || (
                        <span className="text-muted-foreground">
                            No description
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskDescription;
