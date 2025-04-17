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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WorkspaceTable = ({ data }: { data: Workspace[] }) => {
    return (
        <div className="">
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
                            <h2>
                                No projects were found that match your search
                            </h2>
                            <p>Try using specific project names or terms.</p>
                        </div>
                    ) : (
                        <>A list of your recent workspaces.</>
                    )}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-1 px-2">Name</TableHead>
                        <TableHead className="py-1 px-2">Lead</TableHead>
                        <TableHead className="py-1 px-2">Project URL</TableHead>
                        <TableHead className="py-1 px-2 text-right">
                            More actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <TableRow key={item._id} className="py-1 px-2">
                                <TableCell className="">
                                    <Link
                                        href={`/workspaces/${item._id}`}
                                        className="flex flex-row gap-x-2 items-center hover:underline"
                                    >
                                        {(item.image as string).trim() !==
                                        "" ? (
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
                                <TableCell>{item.userId}</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="p-2 cursor-pointer hover:bg-gray-100 rounded-md">
                                            <Ellipsis />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            side="bottom"
                                        >
                                            <DropdownMenuLabel>
                                                My Account
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Billing
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Team
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Subscription
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <Fragment></Fragment>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default WorkspaceTable;
