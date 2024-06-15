"use client"

import React, { FC } from 'react';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface FooterProps { }

const footerColumns: { title: string, items: string[] }[] = [
    {
        title: 'Learn',
        items: ['Assessments', 'Lessons', 'Courses']
    },
    {
        title: 'Opportunities',
        items: ['Hackathons', 'Open Source', 'Events']
    },
    {
        title: 'Community',
        items: ['Leaderboard', 'Credentials', 'Discord', 'My Profile']
    },
    {
        title: 'Resources',
        items: ['Alert Dialog', 'Hover Card', 'Tooltip']
    },
    {
        title: 'Legal',
        items: ['Privacy Policy', 'Terms and Conditions']
    }
];

const socialLinks: { title: string, href: string, url: string }[] = [
    {
        title: 'Facebook',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=8818&format=png&color=ffffff'
    },
    {
        title: 'Twitter',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=60014&format=png&color=ffffff'
    },
    {
        title: 'Instagram',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=59813&format=png&color=ffffff'
    },
    {
        title: 'LinkedIn',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=8808&format=png&color=ffffff'
    },
    {
        title: 'YouTube',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=37326&format=png&color=ffffff'
    },
    {
        title: 'GitHub',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=zuHqpgzrusU5&format=png&color=ffffff'
    },
    {
        title: 'Discord',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=30888&format=png&color=ffffff'
    },
    {
        title: 'Slack',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=OBMhWEebAWe9&format=png&color=ffffff'
    }
];

const Footer: FC<FooterProps> = () => (
    <footer className="border-t bg-card">
        <div className="container mx-auto py-4 md:py-6 grid">
            <div className="grid lg:flex justify-center lg:justify-between lg:gap-12 gap-6 items-center lg:items-start">
                <div className="grid grid-cols-3 md:grid-cols-5 items-start gap-6 lg:gap-0">
                    {footerColumns.map((column, index) => (
                        <div key={index} className="grid gap-6 text-center items-center justify-center">
                            <h3 className="font-medium text-sm">{column.title}</h3>
                            <nav className="grid items-center justify-center gap-4">
                                {column.items.map((link, index) => (
                                    <Link key={index} href="/" className="hover:underline text-sm text-muted-foreground text-nowrap lg:text-wrap">{link}</Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col lg:grid gap-4 items-center justify-start">
                    <h3 className="font-medium">Subscribe to our newsletter</h3>
                    <p className="text-muted-foreground">The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex w-full max-w-sm items-center gap-2">
                        <Input type="email" placeholder="Email*" />
                        <Button type="submit">Subscribe</Button>
                    </div>
                    <p className="text-muted-foreground text-xs text-wrap">*We care about the protection of your data. Read our <Link href="/" className="hover:underline">Privacy Policy</Link>.</p>
                </div>
            </div>
            <div className="border-t grid md:flex md:justify-between gap-6 items-center mt-6 py-6">
                <div className="flex justify-center items-center gap-6">
                    <Button asChild className="px-8 py-2">
                        <Link href="/">Logo</Link>
                    </Button>
                    <p className="text-muted-foreground text-end w-full">© 2024 Company. All rights reserved.</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                    {socialLinks.map((link, index) => (
                        <Avatar key={index} className="h-6 w-6">
                            <AvatarImage src={link['url']} alt={link['title']} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
            </div>
        </div >
    </footer >
);

export default Footer;
