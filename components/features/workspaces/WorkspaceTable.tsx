import React, { Fragment } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Image from "next/image";

import Link from "next/link";
import { motiBaseUrl } from "@/constants";

const WorkspaceTable = ({ data }: { data: Workspace[] }) => {
    return (
        <Table>
            <TableCaption>
                {data.length == 0 ? (
                    <div className="flex flex-col items-center w-full">
                        <Image
                            src="/data-not-found.png"
                            width={300}
                            height={300}
                            alt="Not found data"
                        ></Image>
                        <h2>No projects were found that match your search</h2>
                        <p>Try using specific project names or terms.</p>
                    </div>
                ) : (
                    <>A list of your recent workspaces.</>
                )}
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="py-1 px-2">Name</TableHead>
                    <TableHead className="py-1 px-2 min-w-[150px]">
                        Lead
                    </TableHead>
                    <TableHead className="py-1 px-2">Workspace URL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((item) => (
                        <TableRow key={item._id} className="p-10">
                            <TableCell className="">
                                <Link
                                    href={`/workspaces/${item._id}`}
                                    className="flex flex-row gap-x-2 items-center hover:underline"
                                >
                                    {(item.image as string).trim() !== "" ? (
                                        <div className="size-9 relative">
                                            <Image
                                                src={
                                                    typeof item.image ===
                                                    "string"
                                                        ? item.image
                                                        : ""
                                                }
                                                fill
                                                alt={`${item.name} logo`}
                                                className="rounded-md"
                                            />
                                        </div>
                                    ) : (
                                        <div className="size-9 bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-md" />
                                    )}
                                    <p className="">{item.name}</p>
                                </Link>
                            </TableCell>
                            <TableCell>{item.workspaceCreator}</TableCell>
                            <TableCell>
                                {motiBaseUrl}/workspaces/{item._id}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <Fragment></Fragment>
                )}
            </TableBody>
        </Table>
    );
};

export default WorkspaceTable;
