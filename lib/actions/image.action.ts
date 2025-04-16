"use server";
import { ActionResponse, ErrorResponse } from "@/types/server";

import { v2 as cloudinary } from "cloudinary";
import handleError from "../handlers/error";
import { BadRequestError } from "../http-error";
import path, { resolve } from "path";
import { tmpdir } from "os";
import { writeFile } from "fs/promises";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadImage = async (
    formData: File
): Promise<ActionResponse<{ public_id: string; url: string }>> => {
    try {
        const image = formData;
        // Validate if the image exists
        if (!image) {
            throw new BadRequestError("No files were uploaded.");
        }

        // Check if the image is a File object
        if (!(image instanceof File)) {
            throw new BadRequestError("Expected image to be a File.");
        }

        if (image.size > 1024 * 1024 * 5) {
            throw new BadRequestError("Size too large");
        }

        if (image.type !== "image/jpeg" && image.type !== "image/png") {
            throw new BadRequestError("File format is incorrect");
        }

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const tempPath = path.join(tmpdir(), image.name);
        await writeFile(tempPath, buffer);

        const result = await cloudinary.uploader.upload(tempPath, {
            folder: "/Moti-Task_Management/workspace",
        });

        return {
            success: true,
            data: { public_id: result.public_id, url: result.secure_url },
            status: 201,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};

export const deleteImage = async ({
    params,
}: {
    params: { public_id: string };
}): Promise<ActionResponse> => {
    try {
        const { public_id } = params;
        if (!public_id) {
            throw new BadRequestError("No image selected!");
        }

        await cloudinary.uploader
            .destroy(
                public_id,

                async (err, result) => {
                    if (err) throw err;
                }
            )
            .then((result) => {
                console.log(result);
            });

        return { success: true, status: 200 };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
};
