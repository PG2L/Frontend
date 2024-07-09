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
    course?: Course;
    courses?: Course[];
    lesson?: Lesson;
    lessons?: Lesson[];
    user?: User;
    users?: User[];
}

/**
 * Renders the admin header component.
 *
 * @component
 * @param {AdminHeaderProps} props - The component props.
 * @returns {React.JSX.Element} The rendered component.
 */
const AdminHeader: FC<AdminHeaderProps> = ({
    course,
    courses,
    lesson,
    lessons,
    user,
    users,
}: AdminHeaderProps): React.JSX.Element => {

    /**
     * Determines the context of the page.
     * @type {"course" | "lesson" | "user"}
     */
    const pageContext: "course" | "lesson" | "user" = course ? "course" : lesson ? "lesson" : "user";

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
                        { course ? course.id : lesson ? lesson.id : user ? user.id : '' } -{ " " }
                    </h1>
                    <span className="text-foreground font-medium ms-2 w-full">
                        { course ? course.title : lesson ? lesson.title : user ? user.email : "" }
                    </span>
                </div>
                <Select
                    onValueChange={ (value: string): never => redirect(`/admin/${pageContext}s/${value}`) }
                >
                    <SelectTrigger className="md:w-1/3">
                        <SelectValue placeholder={ `Select a ${pageContext}` } />
                    </SelectTrigger>
                    <SelectContent>
                        { courses &&
                            courses.map((courseItem: Course): React.JSX.Element => (
                                <SelectItem key={ courseItem.id } value={ courseItem.id }>
                                    { courseItem.id } - { courseItem.title }
                                </SelectItem>
                            )) }
                        { lessons &&
                            lessons.map((lessonItem: Lesson): React.JSX.Element => (
                                <SelectItem key={ lessonItem.id } value={ lessonItem.id }>
                                    { lessonItem.id } - { lessonItem.title }
                                </SelectItem>
                            )) }
                        { users &&
                            users.map((userItem: User): React.JSX.Element => (
                                <SelectItem key={ userItem.id } value={ userItem.id }>
                                    { userItem.id } - { userItem.email }
                                </SelectItem>
                            )) }
                    </SelectContent>
                </Select>
            </div>
        </Suspense>
    );
};

export default AdminHeader;
