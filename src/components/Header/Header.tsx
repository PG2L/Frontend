"use client"

import React, { FC } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from '../ui/input';


interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
    <header className="header flex justify-between items-center px-5 py-3 hover:bg-black/[0.03] border-solid border-b transition-all duration-300" id="header" data-testid="header">
        <div className="header-left-side flex justify-between items-center space-x-8">
            <Button asChild variant="outline" className="header-left-side__logo border-solid border border-black px-8 py-2 rounded bg-white/50">
                <Link href="/">Logo</Link>
            </Button>
            <NavigationMenu>
                <NavigationMenuList className="space-x-6">
                    <NavigationMenuItem>
                        <Button asChild variant="ghost">
                            <NavigationMenuLink href="/">Home</NavigationMenuLink>
                        </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Button asChild variant="ghost">
                            <NavigationMenuLink href="/about">About</NavigationMenuLink>
                        </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Button asChild variant="ghost">
                            <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        <div className="header-right-side flex justify-between items-center space-x-16">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="search" placeholder="Search..." />
                <Button variant="outline" type="submit">Search</Button>
            </div>
            <div className="header-right-side__account flex justify-between items-center space-x-4">
                <Button asChild variant="outline">
                    <Link href="/signin">Sign in</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </div>
    </header>
);

export default Header;