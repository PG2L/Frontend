"use client";

import React, {
    FC,
    Suspense
} from "react";
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
    item: Course | Lesson | User | Assessment | Question;
    content: Course[] | Lesson[] | User[] | Assessment[] | Question[];
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
     * @type {"course" | "lesson" | "user" | "assessment" | "question"}
     */
    const pageContext: "user" | "course" | "lesson" | "assessment" | "question" = ("email" in item) ? "user" : ("language" in item) ? "course" : ("lesson_number" in item) ? "lesson" : ("questions" in item) ? "assessment" : "question";

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
                            ("title" in item) ? item.title : ("email" in item) ? item.email : item.content // Displaying the title, email, or content of the item
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
                            { content.map((contentItem: User | Course | Lesson | Assessment | Question): React.JSX.Element => (
                                <SelectItem
                                    key={ contentItem.id }
                                    value={ contentItem.id.toString() }
                                >
                                    { contentItem.id } - { ("title" in contentItem) ? // Displaying the ID and title or email of the content item
                                        contentItem.title
                                        : ("email" in contentItem) ? contentItem.email : contentItem.content }
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
