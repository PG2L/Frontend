"use client";

import React, {
    FC,
} from "react";
import styles from "./AdminHeader.module.css";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/_components/ui/select";
import { redirect } from "next/navigation";

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

        <div className="md:flex grid items-center gap-6 w-full">
            <div className="flex md:w-2/3 text-lg">
                <h1 className="text-muted-foreground text-nowrap">
                    Edit { pageContext } #
                    { item.id } -
                    { " " }
                </h1>
                <span className="text-foreground font-medium ms-2 w-full">
                    { ("title" in item) ? item.title : ("email" in item) ? item.email : item.content
                    }
                </span>
            </div>
            <Select // Redirects to the selected item page
                onValueChange={ (value: string): never => redirect(`/admin/${pageContext}s/${value}`) }>
                <SelectTrigger className="md:w-1/3">
                    <SelectValue placeholder={ `Select a ${pageContext}` } />
                </SelectTrigger>
                <SelectContent>
                    { content.map((contentItem: User | Course | Lesson | Assessment | Question): React.JSX.Element => (
                        <SelectItem
                            key={ contentItem.id }
                            value={ contentItem.id.toString() }
                        >
                            { contentItem.id } - { ("title" in contentItem) ?
                                contentItem.title
                                : ("email" in contentItem) ? contentItem.email : contentItem.content }
                        </SelectItem>
                    )) }
                </SelectContent>
            </Select>
        </div>

    );
};

export default AdminHeader;
