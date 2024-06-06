"use client"

import React, { FC } from 'react';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface FooterProps { }

const footerColumns: {title: string, items: string[]}[] = [
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

const socialLinks: {title: string, href: string, url: string}[] = [
    {
        title: 'Facebook',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=8818&format=png&color=000000'
    },
    {
        title: 'Twitter',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=60014&format=png&color=000000'
    },
    {
        title: 'Instagram',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=59813&format=png&color=000000'
    },
    {
        title: 'LinkedIn',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=8808&format=png&color=000000'
    },
    {
        title: 'YouTube',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=37326&format=png&color=000000'
    },
    {
        title: 'GitHub',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=zuHqpgzrusU5&format=png&color=000000'
    },
    {
        title: 'Discord',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=30888&format=png&color=000000'
    },
    {
        title: 'Slack',
        href: '/',
        url: 'https://img.icons8.com/?size=100&id=OBMhWEebAWe9&format=png&color=000000'
    }
];

const Footer: FC<FooterProps> = () => (
    <footer className="footer border-t py-12 px-20">
        <div className="container mx-auto px-4 flex flex-col space-y-4">
            <div className="footer__top flex justify-between items-start space-x-12">
                <div className="footer__content flex justify-between items-start space-x-12">
                    {footerColumns.map((column, index) => (
                        <div key={index} className="footer__column flex flex-col items-center justify-center space-y-8">
                            <h3 className="font-medium text-sm">{column.title}</h3>
                            <nav className="footer__column__nav flex flex-col items-center justify-center space-y-4">
                                {column.items.map((link, index) => (
                                    <Link key={index} href="/" className="hover:underline text-sm">{link}</Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>
                <div className="footer__subscribe flex flex-col items-start">
                    <h3 className="font-medium">Subscribe to our newsletter</h3>
                    <p className="text-muted-foreground mt-4">The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
                        <Input type="email" placeholder="Email*" />
                        <Button type="submit">Subscribe</Button>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs text-wrap">*We care about the protection of your data. Read our <Link href="/" className="hover:underline">Privacy Policy</Link>.</p>
                </div>
            </div>
            <hr/>
            <div className="footer__bottom flex justify-between items-center mt-12">
                <div className="w-1/3">
                    <Button asChild variant="outline" className="footer__logo border-solid border border-black px-8 py-2 rounded bg-white/50">
                        <Link href="/">Logo</Link>
                    </Button>
                </div>
                <div className="footer__copyright justify-self-center w-1/3">
                    <p className="text-muted-foreground text-center">© 2024 Company. All rights reserved.</p>
                </div>
                <div className="footer__social-links flex justify-end items-center space-x-2 w-1/3">
                    {socialLinks.map((link, index) => (
                        <Avatar key={index} className="h-6 w-6">
                            <AvatarImage src={link['url']} alt={link['title']} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
            </div>
        </div>
    </footer >
);

export default Footer;
