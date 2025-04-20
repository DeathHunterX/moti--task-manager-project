import React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
    className?: string;
    placeholder?: string;
}

const DatePicker = ({
    value,
    onChange,
    className,
    placeholder = "Select date",
}: DatePickerProps) => {
    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size="lg"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 size-4" />
                    {value ? (
                        format(value, "PPP")
                    ) : (
                        <span>{placeholder ?? "Pick a date"}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
