"use client";

import React, { FC, useEffect, useState } from 'react';
import styles from './GlobalBreadcrumb.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../ui/breadcrumb';

interface GlobalBreadcrumbProps {
    courses?: any[],
}

const GlobalBreadcrumb: FC<GlobalBreadcrumbProps> = ({
    courses,
}: {
    courses: any[],
}) => {

    const paths = usePathname() || '';
    const pathNames = paths.split('/').filter(path => path);
    const [itemLinks, setItemLinks] = useState<string[]>([]);

    useEffect(() => {
        const fetchItemsNames = async () => {
            const links: string[] = await Promise.all(pathNames.map(async (link, index) => {
                if (link.match(/^[0-9]+$/)) {
                    if (index === 1) {
                        return courses[parseInt(link) - 1].title;
                    } else if (index === 2) {
                        return courses[parseInt(pathNames[1]) - 1].lessons.find((lesson: any) => lesson.id === parseInt(link)).title;
                    }
                }
                return link[0].toUpperCase() + link.slice(1, link.length);
            }));
            setItemLinks(links);
        };
        fetchItemsNames();
    }, [pathNames]);

    return (
        <>
            { pathNames.length > 1 &&
                <nav className={ styles.breadcrumb }>
                    <Breadcrumb>
                        <BreadcrumbList>
                            { itemLinks.map((itemLink, index) => {
                                let href = `/${pathNames.slice(0, index + 1).join('/')}`;
                                return (
                                    <>
                                        { itemLinks.length !== index + 1 ?
                                            <>
                                                <BreadcrumbItem>
                                                    <BreadcrumbLink asChild>
                                                        <Link href={ href }>{ itemLink }</Link>
                                                    </BreadcrumbLink>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator />
                                            </>
                                            :
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{ itemLink }</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        }
                                    </>
                                );
                            }) }
                        </BreadcrumbList >
                    </Breadcrumb>
                </nav >
            }
        </>
    );
};

export default GlobalBreadcrumb;