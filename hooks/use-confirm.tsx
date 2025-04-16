import { useState } from "react";

import ResponsiveModal from "@/components/shared/ResponsiveModal";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const useConfirm = (
    title: string,
    message: string,
    variant: ButtonProps["variant"] = "primary"
): [() => React.JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <ResponsiveModal
            open={promise !== null}
            onOpenChange={handleClose}
            title={title}
            description={message}
        >
            <div className="gap-y-2 lg:gap-y-0 py-4 lg:pt-2 lg:py-4 w-full flex flex-col lg:flex-row gap-x-2 items-center justify-end">
                <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full lg:w-auto"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant={variant}
                    className="w-full lg:w-auto"
                >
                    Confirm
                </Button>
            </div>
        </ResponsiveModal>
    );

    return [ConfirmationDialog, confirm];
};
