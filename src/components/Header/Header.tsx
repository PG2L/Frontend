"use client"

import React, { FC } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '@radix-ui/react-context-menu';
import { NavigationMenuViewport } from '@radix-ui/react-navigation-menu';


interface HeaderProps { }

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

const Header: FC<HeaderProps> = () => (
    <header className="header py-3 bg-white border-solid border-b transition-all duration-300 w-full fixed top-0 bg-white z-50" id="header" data-testid="header">
        <div className="container flex justify-between items-center">
            <div className="header-left-side flex justify-between items-center space-x-8">
                <Button asChild variant="outline" className="header-left-side__logo border-solid border border-black px-8 py-2 rounded bg-white/50">
                    <Link href="/">Logo</Link>
                </Button>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                            <NavigationMenuContent data-motion="horizontal">
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    shadcn/ui
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
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
                            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/docs" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Documentation
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="header-right-side flex justify-between items-center space-x-16">
                <div className="header-right-side__account flex justify-between items-center space-x-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Sign up</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <Card className="w-80">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Sign Up</CardTitle>
                                            <CardDescription>
                                                Enter your information to create an account
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <label htmlFor="first-name">First name</label>
                                                        <Input id="first-name" placeholder="Max" required />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <label htmlFor="last-name">Last name</label>
                                                        <Input id="last-name" placeholder="Robinson" required />
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <label htmlFor="email">Email</label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <label htmlFor="password">Password</label>
                                                    <Input id="password" type="password" />
                                                </div>
                                                <Button type="submit" className="w-full">
                                                    Create an account
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    Sign up with GitHub
                                                </Button>
                                            </div>
                                            <div className="mt-4 text-center text-sm">
                                                Already have an account?{" "}
                                                <Link href="#" className="underline">
                                                    Sign in
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Login</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <Card className="w-80">
                                        <CardHeader>
                                            <CardTitle className="text-2xl">Login</CardTitle>
                                            <CardDescription>
                                                Enter your email below to login to your account
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-4">
                                                <div className="grid gap-2">
                                                    <label htmlFor="email">Email</label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="flex items-center">
                                                        <label htmlFor="password">Password</label>
                                                        <Link href="#" className="ml-auto inline-block text-sm underline">
                                                            Forgot your password?
                                                        </Link>
                                                    </div>
                                                    <Input id="password" type="password" required />
                                                </div>
                                                <Button type="submit" className="w-full">
                                                    Login
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    Login with Google
                                                </Button>
                                            </div>
                                            <div className="mt-4 text-center text-sm">
                                                Don&apos;t have an account?{" "}
                                                <Link href="#" className="underline">
                                                    Sign up
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="Search..." />
                        <Button variant="outline" type="submit">Search</Button>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;