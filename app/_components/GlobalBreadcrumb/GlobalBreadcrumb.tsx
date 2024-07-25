"use client";

import React, { FC } from 'react';
import styles from './GlobalBreadcrumb.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from '@/_components/ui/breadcrumb';

interface GlobalBreadcrumbProps {
    courses: Course[],
}

/**
 * Renders a global breadcrumb component.
 *
 * @param courses - An array of courses.
 * @returns The rendered global breadcrumb component.
 */
const GlobalBreadcrumb: FC<GlobalBreadcrumbProps> = ({
    courses,
}: GlobalBreadcrumbProps): React.JSX.Element => {

    /**
     * Retrieves the current pathname using the `usePathname` hook.
     * @returns The current pathname as a string.
     */
    const paths: string = usePathname() || '';

    /**
     * Splits the given paths string by '/' and filters out any empty paths.
     * 
     * @param paths - The paths string to be split.
     * @returns An array of non-empty path names.
     */
    const pathNames: string[] = paths.split('/').filter(path => path);

    /**
     * Maps the path names to corresponding breadcrumb links.
     * @param pathNames - An array of path names.
     * @param courses - An array of courses.
     * @returns An array of breadcrumb links.
     */
    const itemsLinks: string[] = pathNames.map((link: string, index: number): string => {
        if (link.match(/^[0-9]+$/)) {
            if (index === 1) {
                return courses[parseInt(link) - 1].title;
            } else if (index === 2) {
                const lesson: Lesson | undefined = courses[parseInt(pathNames[1]) - 1].lessons.find((lesson: any): boolean => lesson.id === parseInt(link));
                return lesson ? lesson.title : '';
            }
        }
        return link[0].toUpperCase() + link.slice(1, link.length);
    });

    return (

        <nav>
            <Breadcrumb>
                <BreadcrumbList>
                    { itemsLinks.map((itemLink: string, index: number): React.JSX.Element => {
                        let href: string = `/${pathNames.slice(0, index + 1).join('/')}`;
                        return (
                            itemsLinks.length !== index + 1 ?
                                <>
                                    <BreadcrumbItem key={ index }>
                                        <BreadcrumbLink href={ href }>
                                            { itemLink }
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator key={ `s${index}` } />
                                </>
                                :
                                <BreadcrumbItem key={ index }>
                                    <BreadcrumbPage>{ itemLink }</BreadcrumbPage>
                                </BreadcrumbItem>
                        );
                    }) }
                </BreadcrumbList>
            </Breadcrumb>
        </nav>

    );
};

export default GlobalBreadcrumb;
