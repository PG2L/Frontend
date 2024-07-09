"use client";

import React, { FC } from 'react';
import styles from './AdminMenu.module.css';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

interface AdminMenuProps { }

/**
 * Renders the admin menu component.
 * @component
 */
const AdminMenu: FC<AdminMenuProps> = (): React.JSX.Element => {

    const path: string = usePathname() || "";
    const pageContext: string = path.split("/")[2];
    const contextSlug: string = path.split("/")[3];
    const menuItems: {
        title: string;
        content: {
            title: string;
            href: string;
            active: boolean;
        }[];
    }[] = [
            {
                title: "Courses",
                content: [
                    {
                        title: "Create a new course",
                        href: "/admin/courses/new",
                        active: pageContext === "courses" && contextSlug === "new",
                    },
                    {
                        title: "Edit an existing course",
                        href: "/admin/courses/1",
                        active: pageContext === "courses" && contextSlug !== "new",
                    }
                ]
            },
            {
                title: "Lessons",
                content: [
                    {
                        title: "Create a new lesson",
                        href: "/admin/lessons/new",
                        active: pageContext === "lessons" && contextSlug === "new",
                    },
                    {
                        title: "Edit an existing lesson",
                        href: "/admin/lessons/1",
                        active: pageContext === "lessons" && contextSlug !== "new",
                    }
                ]
            },
            {
                title: "Users",
                content: [
                    {
                        title: "Create a new user",
                        href: "/admin/users/new",
                        active: pageContext === "users" && contextSlug === "new",
                    },
                    {
                        title: "Edit an existing user",
                        href: "/admin/users/6",
                        active: pageContext === "users" && contextSlug !== "new",
                    }
                ]
            },
        ];

    return (
        <div className="hidden md:flex flex-col gap-0 w-1/4 h-auto">
            <nav className="flex flex-col gap-2 w-full h-full">
                <div className="grid gap-2 w-full sticky h-fit top-6">
                    { menuItems.map((item: {
                        title: string;
                        content: {
                            title: string;
                            href: string;
                            active: boolean;
                        }[];
                    }, index: number): React.JSX.Element => (
                        <>
                            { index !== 0 && <Separator /> }
                            <h2 className="text-lg">{ item.title }</h2>
                            { item.content.map((content: {
                                title: string;
                                href: string;
                                active: boolean;
                            }, index: number): React.JSX.Element => (
                                <Link href={ content.href } key={ index }>
                                    <Button variant="ghost" className={ `!w-full text-start text-wrap text-muted-foreground hover:text-foreground ${content.active && "active"}` }>
                                        <span className="w-full">{ content.title }</span>
                                    </Button>
                                </Link>
                            )) }
                        </>
                    )) }
                </div>
            </nav>
        </div>
    );
};

export default AdminMenu;
