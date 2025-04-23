import Image from "next/image";
import Link from "next/link";

interface RecentSectionProps {
    title: string;
    data: Workspace[] | Project[];
    noItemsMessage: string;
    linkHref: string;
    linkText: string;
}

const RecentSection = ({
    title,
    data,
    noItemsMessage,
    linkHref,
    linkText,
}: RecentSectionProps) => {
    return (
        <div className="mb-12">
            <div className="">
                <h3 className="text-base text-[#172B4D] font-semibold my-3">
                    {title}
                </h3>
            </div>
            {data.length > 0 ? (
                <div className="grid grid-cols-6 gap-3">
                    {data.map((card) => (
                        <div className="grid-cols-6" key={card._id}>
                            <div className="border rounded-md p-3">
                                <Link
                                    href={`/workspaces/${card._id}`}
                                    className="flex flex-col gap-y-2 items-center hover:underline"
                                >
                                    {(card.image as string).trim() !== "" ? (
                                        <div className="size-[125px] relative">
                                            <Image
                                                src={
                                                    typeof card.image ===
                                                    "string"
                                                        ? card.image
                                                        : card.image
                                                        ? URL.createObjectURL(
                                                              card.image
                                                          )
                                                        : ""
                                                }
                                                fill
                                                alt={`${card.name} image`}
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="size-[125px] bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-md" />
                                    )}
                                    <p className="font-semibold text-lg">
                                        {card.name}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <h3 className="text-base text-[#172B4D] font-semibold">
                        {noItemsMessage}
                    </h3>
                    <p className="text-sm text-[#172B4D] my-5">
                        You have no recently {title.toLowerCase()}
                    </p>
                    <Link
                        href={linkHref}
                        role="button"
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm"
                    >
                        {linkText}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RecentSection;
