import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

import React from "react";

interface ResponsiveModalProps {
    open: boolean;
    onOpenChange: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
}

const ResponsiveModal = ({
    open,
    onOpenChange,
    children,
    title,
    description,
}: ResponsiveModalProps) => {
    const isMobile = useIsMobile(1024);

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className="p-8 pt-0 lg:min-w-[40vw] lg:max-w-md">
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    {children}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:min-w-[40vw] lg:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default ResponsiveModal;
