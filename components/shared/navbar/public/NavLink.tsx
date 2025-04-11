import { publicNavBarMap } from "@/constants";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const NavLink = () => {
    return (
        <>
            <div className="hidden lg:block">
                <ul className="flex flex-col md:flex-row md:gap-3 lg:gap-6">
                    {publicNavBarMap.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                            {item.items.length > 0 ? (
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger
                                                className="font-normal text-base data-[state=open]:hover:bg-white hover:bg-white 
                                    transition-[bg-white, box-shadow] data-[state=open]:focus:bg-white focus:bg-white 
                                    data-[state=open]:bg-white"
                                            >
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul>
                                                    {item.items.map(
                                                        (subItem, idx) => (
                                                            <li key={idx}>
                                                                <Link
                                                                    href={
                                                                        subItem.url
                                                                    }
                                                                    legacyBehavior
                                                                    passHref
                                                                >
                                                                    <NavigationMenuLink
                                                                        className={navigationMenuTriggerStyle()}
                                                                    >
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </NavigationMenuLink>
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            ) : (
                                <Link
                                    href={`${item.url}`}
                                    className="py-2 px-4"
                                >
                                    {item.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default NavLink;
