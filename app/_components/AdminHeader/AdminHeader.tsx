"use client";

import React, { FC, Suspense } from "react";
import styles from "./AdminHeader.module.css";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { redirect } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface AdminHeaderProps {
    item: Course | Lesson | User;
    content: Course[] | Lesson[] | User[];
}

/**
 * Renders the admin header component.
 *
 * @component
 * @param {AdminHeaderProps} props - The component props.
 * @returns {React.JSX.Element} The rendered component.
 */
const AdminHeader: FC<AdminHeaderProps> = ({
    item,
    content,
}: AdminHeaderProps): React.JSX.Element => {

    /**
     * Determines the context of the page.
     * @type {"course" | "lesson" | "user"}
     */
    const pageContext: "course" | "lesson" | "user" = item.hasOwnProperty("email") ? "user" : item.hasOwnProperty("category") ? "course" : "lesson";

    return (

        <Suspense fallback={
            <div className="md:flex grid items-center gap-6">
                <Skeleton className="md:w-1/2 w-2/3 h-10" />
                <Skeleton className="md:w-1/2 h-10" />
            </div>
        }>
            <div className="md:flex grid items-center gap-6 w-full">
                <div className="flex md:w-2/3 text-lg">
                    <h1 className="text-muted-foreground text-nowrap">
                        Edit { pageContext } #
                        { item.id } -
                        { " " }
                    </h1>
                    <span className="text-foreground font-medium ms-2 w-full">
                        {
                            ("title" in item) ? // Checking if the item has a title property
                                (item as Course | Lesson).title // Casting item to Course or Lesson and displaying its title
                                : item.email // If no title, display the item's email
                        }
                    </span>
                </div>

                {
                    // A Select component for navigating to different admin pages based on the selected value
                    <Select
                        onValueChange={ (value: string): never => redirect(`/admin/${pageContext}s/${value}`) } // Redirects to the selected page context
                    >
                        <SelectTrigger className="md:w-1/3">
                            <SelectValue
                                placeholder={ `Select a ${pageContext}` }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            { content.map((contentItem: User | Course | Lesson): React.JSX.Element => (
                                <SelectItem
                                    key={ contentItem.id }
                                    value={ contentItem.id.toString() }
                                >
                                    { contentItem.id } - { ("title" in contentItem) ? // Displaying the ID and title or email of the content item
                                        (contentItem as Course | Lesson).title
                                        : contentItem.email
                                    }
                                </SelectItem>
                            )) }
                        </SelectContent>
                    </Select>
                }

            </div>
        </Suspense >

    );
};

export default AdminHeader;
