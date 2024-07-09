"use client";

import React, { FC, useEffect, useState, useContext } from 'react';
import styles from './GlobalBreadcrumb.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../ui/breadcrumb';
import { CourseContext } from '../../_contexts/CourseProvider';

interface GlobalBreadcrumbProps {
    courses?: Course[],
}

const GlobalBreadcrumb: FC<GlobalBreadcrumbProps> = ({
    courses,
}: {
    courses: Course[],
}): React.JSX.Element => {

    const paths: string = usePathname() || '';
    const pathNames: string[] = paths.split('/').filter(path => path);
    const itemsLinks: string[] = pathNames.map((link: string, index: number): string => {
        if (link.match(/^[0-9]+$/)) {
            if (index === 1) {
                return courses[parseInt(link) - 1].title;
            } else if (index === 2) {
                return courses[parseInt(pathNames[1]) - 1].lessons.find((lesson: any): boolean => lesson.id === parseInt(link)).title;
            }
        }
        return link[0].toUpperCase() + link.slice(1, link.length);
    });

    return (
        <>
            { pathNames.length > 1 &&
                <nav>
                    <Breadcrumb>
                        <BreadcrumbList>
                            { itemsLinks.map((itemLink: string, index: number): React.JSX.Element => {
                                let href: string = `/${pathNames.slice(0, index + 1).join('/')}`;
                                return (
                                    <>
                                        { itemsLinks.length !== index + 1 ?
                                            <>
                                                <BreadcrumbItem key={ index }>
                                                    <BreadcrumbLink asChild>
                                                        <Link href={ href }>{ itemLink }</Link>
                                                    </BreadcrumbLink>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator />
                                            </>
                                            :
                                            <BreadcrumbItem key={ index }>
                                                <BreadcrumbPage>{ itemLink }</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        }
                                    </>
                                );
                            }) }
                        </BreadcrumbList>
                    </Breadcrumb>
                </nav >
            }
        </>
    );
};

export default GlobalBreadcrumb;
