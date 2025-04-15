import React from "react";
import { toast } from "react-toastify";

interface ErrorToastMsgProps {
    title: string;
    description: string;
}

const CustomErrorToast = ({ data }: { data: ErrorToastMsgProps }) => {
    return (
        <div className="flex flex-col">
            <h4>{data.title}</h4>
            <p>{data.description}</p>
        </div>
    );
};

export const ErrorToastMsg = ({ title, description }: ErrorToastMsgProps) => {
    return toast.error(CustomErrorToast, {
        data: {
            title,
            description,
        },
    });
};
