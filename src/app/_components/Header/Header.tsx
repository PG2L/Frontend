"use client";

import React, { FC } from 'react';
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/app/_lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { Input } from '../ui/input';
import { icons } from 'lucide-react';
import SideBar from '../SideBar/SideBar';
import LoginForm from '../forms/LoginForm/LoginForm';
import SigninForm from '../forms/SigninForm/SigninForm';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const components: { title: string; href: string; description: string; }[] = [
    {
        title: "All lessons",
        href: "/lessons",
        description:
            "A list of every lessons on our website",
    },
    {
        title: "One lesson",
        href: "/courses/1/1",
        description:
            "A single lesson page",
    },
    {
        title: "All courses",
        href: "/courses",
        description:
            "A list of every courses on our website",
    },
    {
        title: "One course",
        href: "/courses/1",
        description: "A single course page",
    },
    {
        title: "User",
        href: "/users/1",
        description:
            "A single user page",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ ref }
                    className={ cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    ) }
                    { ...props }
                >
                    <div className="font-medium leading-none">{ title }</div>
                    <p className="line-clamp-2 leading-snug text-muted-foreground">
                        { children }
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    return (
        <header className="py-3 bg-card border-solid border-b transition-all duration-0 w-full fixed top-0 z-50" id="header" data-testid="header">
            <div className="container flex justify-between items-center flex gap-6">
                <div className="flex justify-between items-center">
                    <SideBar className="lg:hidden" />
                    <Button asChild className="border-solid border border-black px-8 py-2 rounded hidden sm:block">
                        <Link href="/">Logo</Link>
                    </Button>
                    <NavigationMenu className="hidden lg:block ms-4">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-card">Getting started</NavigationMenuTrigger>
                                <NavigationMenuContent data-motion="horizontal">
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <div className="mb-2 mt-4 font-medium">
                                                        shadcn/ui
                                                    </div>
                                                    <p className="leading-tight text-muted-foreground">
                                                        Beautifully designed components that you can copy and
                                                        paste into your apps. Accessible. Customizable. Open
                                                        Source.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/docs" title="Introduction">
                                            Re-usable components built using Radix UI and Tailwind CSS.
                                        </ListItem>
                                        <ListItem href="/docs/installation" title="Installation">
                                            How to install dependencies and structure your app.
                                        </ListItem>
                                        <ListItem href="/docs/primitives/typography" title="Typography">
                                            Styles for headings, paragraphs, lists...etc
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-card">Navigation</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        { components.map((component) => (
                                            <ListItem
                                                key={ component.title }
                                                title={ component.title }
                                                href={ component.href }
                                            >
                                                { component.description }
                                            </ListItem>
                                        )) }
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/admin/courses/new" legacyBehavior passHref>
                                    <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-card` } >
                                        Admin Dashboard
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-4">
                        <div className="w-full max-w-sm items-center gap-2 hidden sm:flex">
                            <Input type="search" placeholder="Search..." />
                            <Button variant="ghost" type="submit" size="icon">
                                <icons.Search />
                            </Button>
                        </div>
                        <DarkModeToggle />
                        <NavigationMenu className="right-0">
                            <NavigationMenuList className="flex gap-2">
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="border-primary border bg-card">
                                        Sign In
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <SigninForm />
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="border-primary border bg-card">
                                        Log In
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <LoginForm />
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </div>
        </header>);
};

export default Header;