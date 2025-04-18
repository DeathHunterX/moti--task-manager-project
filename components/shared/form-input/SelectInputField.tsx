import React, { Fragment, SelectHTMLAttributes } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";

type SelectInputFieldProps<S extends FieldValues> = {
    nameInSchema: keyof S;
    label: string;
    placeholder?: string;
    className?: string;
    isLoading: boolean;
    hasAvatar?: boolean;
    data: { name: string; value: string; image?: string }[];
} & SelectHTMLAttributes<HTMLInputElement>;

const SelectInputField = <S extends FieldValues>({
    nameInSchema,
    label,
    placeholder,
    className = "",
    isLoading,
    hasAvatar = false,
    data,
}: SelectInputFieldProps<S>) => {
    const form = useFormContext<S>();

    return (
        <FormField
            control={form.control}
            name={nameInSchema as Path<S>}
            render={({ field }) => (
                <FormItem className="flex w-full flex-col h-full">
                    <FormLabel
                        className="paragraph-small flex items-start"
                        htmlFor={nameInSchema as string}
                    >
                        {label}
                    </FormLabel>

                    {isLoading ? (
                        <Skeleton className="w-full h-9 rounded-md" />
                    ) : (
                        <Select {...field} onValueChange={field.onChange}>
                            <FormControl>
                                <SelectTrigger
                                    id={nameInSchema as Path<S>}
                                    className={`w-full ${className}`}
                                >
                                    <SelectValue
                                        placeholder={placeholder ?? "Choose..."}
                                    />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                                {data.map((item) => (
                                    <SelectItem
                                        key={`${nameInSchema as Path<S>}_${
                                            item.value
                                        }`}
                                        value={item.value}
                                    >
                                        {hasAvatar ? (
                                            <div className="flex flex-row gap-x-2 items-center capitalize">
                                                <Avatar className="size-6">
                                                    <AvatarImage
                                                        src={item.image || ""}
                                                        alt={item.name ?? ""}
                                                    />
                                                    <AvatarFallback className="bg-blue-500 text-white">
                                                        {item.name?.[0]}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {item.name}
                                            </div>
                                        ) : (
                                            <Fragment>{item.name}</Fragment>
                                        )}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <FormMessage />
                    <FormMessage className="text-left" />
                </FormItem>
            )}
        />
    );
};

export default SelectInputField;
