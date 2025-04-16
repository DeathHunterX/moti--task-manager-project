"use client";

import React, { InputHTMLAttributes, useRef } from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext, FieldValues, Path, PathValue } from "react-hook-form";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type InputFieldProps<S extends FieldValues> = {
    nameInSchema: keyof S;
    label: string;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const ImageInputField = <S extends FieldValues>({
    nameInSchema,
    label,
    className = "",
    ...props
}: InputFieldProps<S>) => {
    const form = useFormContext<S>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue(
                nameInSchema as Path<S>,
                file as PathValue<S, Path<S>>
            );
        }
    };

    return (
        <FormField
            control={form.control}
            name={nameInSchema as Path<S>}
            render={({ field }) => (
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                        {field.value ? (
                            <div className="size-[72px] relative rounded-md overflow-hidden">
                                <Image
                                    src={
                                        (field.value as unknown) instanceof File
                                            ? URL.createObjectURL(field.value)
                                            : (field.value as string)
                                    }
                                    alt="Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <Avatar className="size-[72px]">
                                <AvatarFallback>
                                    <ImageIcon
                                        size={36}
                                        className="text-neutral-400"
                                    />
                                </AvatarFallback>
                            </Avatar>
                        )}
                        <div className="flex flex-col">
                            <p className="text-sm">{label}</p>
                            <p className="text-sm text-muted-foreground">
                                JPG, PNG, SVG or JPEG, max 1MB
                            </p>
                            <Input
                                className="hidden"
                                type="file"
                                accept=".jpg, .png, .jpeg, .svg"
                                ref={inputRef}
                                onChange={handleImageChange}
                                disabled={form.formState.isSubmitting}
                            />
                            {field.value ? (
                                <Button
                                    variant="destructive"
                                    type="button"
                                    disabled={form.formState.isSubmitting}
                                    size="sm"
                                    className="w-fit mt-2"
                                    onClick={() => {
                                        field.onChange("");
                                        if (inputRef.current) {
                                            inputRef.current.value = "";
                                        }
                                    }}
                                >
                                    Remove Image
                                </Button>
                            ) : (
                                <Button
                                    variant="teritary"
                                    type="button"
                                    disabled={form.formState.isSubmitting}
                                    size="sm"
                                    className="w-fit mt-2"
                                    onClick={() => inputRef.current?.click()}
                                >
                                    Upload Image
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default ImageInputField;
