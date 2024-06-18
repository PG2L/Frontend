"use client";

import React, { FC, useEffect, useState } from 'react';
import styles from './GlobalBreadcrumb.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../ui/breadcrumb';

interface GlobalBreadcrumbProps { }

const GlobalBreadcrumb: FC<GlobalBreadcrumbProps> = () => {

    const paths = usePathname() || '';
    const pathNames = paths.split('/').filter(path => path);
    const [itemLinks, setItemLinks] = useState<string[]>([]);

    useEffect(() => {
        const fetchItemsNames = async () => {
            const links: string[] = await Promise.all(pathNames.map(async (link, index) => {
                if (!isNaN(parseInt(link))) {
                    const itemType = pathNames[index - 1];
                    const response = await fetch(`http://localhost:8000/${itemType}/${link}`);
                    const data = await response.json();
                    return data.title;
                } else {
                    return link[0].toUpperCase() + link.slice(1, link.length);
                }
            }));
            setItemLinks(links);
        };
        fetchItemsNames();
    }, [pathNames]);

    return (
        <nav className={styles.breadcrumb}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {itemLinks.map((itemLink, index) => {
                        let href = `/${itemLinks.slice(0, index + 1).join('/').toLowerCase()}`;
                        return (
                            <>
                                {itemLinks.length !== index + 1 ?
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={href}>{itemLink}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </>
                                    :
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{itemLink}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                }
                            </>
                        )
                    })}
                </BreadcrumbList >
            </Breadcrumb>
        </nav >
    )
};

export default GlobalBreadcrumb;