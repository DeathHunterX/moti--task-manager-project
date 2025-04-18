import React, { InputHTMLAttributes } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { useFormContext, FieldValues, Path } from "react-hook-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type DatePickerFieldProps<S extends FieldValues> = {
    nameInSchema: keyof S;
    label: string;
    placeholder?: string;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const DatePickerField = <S extends FieldValues>({
    nameInSchema,
    label,
    placeholder,
    className = "",
}: DatePickerFieldProps<S>) => {
    const form = useFormContext<S>();

    return (
        <FormField
            control={form.control}
            name={nameInSchema as Path<S>}
            render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                    <FormLabel className="paragraph-small flex items-start">
                        {label}
                    </FormLabel>
                    <Popover modal={true}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    size="lg"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                        className
                                    )}
                                >
                                    <CalendarIcon className="mr-2 size-4" />
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>
                                            {placeholder ?? "Pick a date"}
                                        </span>
                                    )}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DatePickerField;
