"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface MainMenuProps { }

const MainMenu: FC<MainMenuProps> = () => {

    const path = usePathname();
    const pageContext = path.split('/')[1];

    const menuItems = [
        {
            title: 'Home',
            link: '/home',
        },
        {
            title: 'Courses',
            link: '/courses',
        }, ,
        {
            title: 'Leaderboard',
            link: '/leaderboard',
        },
        {
            title: 'Achievements',
            link: '/achievements',
        },
        {
            title: 'Statistics',
            link: '/statistics',
        },
        {
            title: 'Profile',
            link: '/profile',
        },
        {
            title: 'Settings',
            link: '/settings',
        },
        {
            title: 'About',
            link: '/about',
        },
        {
            title: 'Admin',
            link: '/admin/courses/new',
        },
    ]
    return (
        <div className={`!w-1/5 flex flex-col gap-6`}>
            <h1 className="text-foreground text-lg font-medium text-center">Welcome, Nakkarst</h1>
            <div className="h-fit sticky top-6 grid gap-2">
                <Separator className="mb-4" />
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.link}>
                        <Button variant="ghost" className={`w-full text-start ${pageContext === item.link.slice(1, item.link.length + 1) && "active"}`}>
                            <span className="w-full">{item.title}</span>
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default MainMenu;
