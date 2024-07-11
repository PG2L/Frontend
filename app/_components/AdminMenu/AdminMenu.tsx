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
const AdminMenu: FC<AdminMenuProps> = ({ }: AdminMenuProps): React.JSX.Element => {

    /**
     * Retrieves the current pathname using the `usePathname` hook.
     * If the pathname is not available, an empty string is returned.
     *
     * @returns The current pathname as a string.
     */
    const path: string = usePathname() || "";

    /**
     * Retrieves the page context from the given path.
     * 
     * @param path - The path from which to extract the page context.
     * @returns The page context extracted from the path.
     */
    const pageContext: string = path.split("/")[2];

    /**
     * Extracts the context slug from the given path.
     * 
     * @param path - The path from which to extract the context slug.
     * @returns The context slug extracted from the path.
     */
    const contextSlug: string = path.split("/")[3];

    /**
     * Represents the menu items for the admin menu.
     */
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
                title: "Assessments",
                content: [
                    {
                        title: "Create a new assessment",
                        href: "/admin/assessments/new",
                        active: pageContext === "assessments" && contextSlug === "new",
                    },
                    {
                        title: "Edit an existing assessment",
                        href: "/admin/assessments/1",
                        active: pageContext === "assessments" && contextSlug !== "new",
                    }
                ]
            },
            {
                title: "Questions",
                content: [
                    {
                        title: "Create a new question",
                        href: "/admin/questions/new",
                        active: pageContext === "questions" && contextSlug === "new",
                    },
                    {
                        title: "Edit an existing question",
                        href: "/admin/questions/1",
                        active: pageContext === "questions" && contextSlug !== "new",
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
                    {
                        // Mapping over the menu items to create a list of menu items
                        menuItems.map((item: {
                            title: string;
                            content: {
                                title: string;
                                href: string;
                                active: boolean;
                            }[];
                        }, index: number): React.JSX.Element => (
                            <>
                                {
                                    index !== 0 && <Separator /> // Adds a separator between menu items
                                }
                                <h2 className="text-lg">
                                    { item.title }
                                </h2>
                                { item.content.map((content: { // Maps over the content items to create a list of content items
                                    title: string;
                                    href: string;
                                    active: boolean;
                                }, index: number): React.JSX.Element => (
                                    <Link
                                        href={ content.href } // Link to the content item
                                        key={ index }
                                    >
                                        <Button
                                            variant="ghost"
                                            className={
                                                `!w-full text-start text-wrap text-muted-foreground hover:text-foreground` +
                                                ` ${content.active && "active"}` // Styles the button, highlighting if active
                                            }
                                        >
                                            <span className="w-full">{ content.title }</span>
                                        </Button>
                                    </Link>
                                )) }
                            </>
                        ))
                    }
                </div>
            </nav >
        </div >

    );
};

export default AdminMenu;
