"use client"

import React, { FC } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from '@/components/ui/navigation-menu';

interface FooterProps { }

const Footer: FC<FooterProps> = () => (
    <footer className="footer flex justify-between py-24 px-36 border-t mt-3">
        <div className="footer__column flex flex-col items-center justify-center space-y-12">
            <h3>Column 1</h3>
            <nav className="footer__column__nav flex flex-col items-center justify-center space-y-6">
                <Link href="/" className="hover:underline">Alert Dialog</Link>
                <Link href="/" className="hover:underline">Hover Card</Link>
                <Link href="/" className="hover:underline">Progress</Link>
                <Link href="/" className="hover:underline">Scroll-area</Link>
                <Link href="/" className="hover:underline">Tabs</Link>
                <Link href="/" className="hover:underline">Tooltip</Link>
            </nav>
        </div>
        <div className="footer__column flex flex-col items-center justify-center space-y-12">
            <h3>Column 1</h3>
            <nav className="footer__column__nav flex flex-col items-center justify-center space-y-6">
                <Link href="/" className="hover:underline">Alert Dialog</Link>
                <Link href="/" className="hover:underline">Hover Card</Link>
                <Link href="/" className="hover:underline">Progress</Link>
                <Link href="/" className="hover:underline">Scroll-area</Link>
                <Link href="/" className="hover:underline">Tabs</Link>
                <Link href="/" className="hover:underline">Tooltip</Link>
            </nav>
        </div>
        <div className="footer__column flex flex-col items-center justify-center space-y-12">
            <h3>Column 1</h3>
            <nav className="footer__column__nav flex flex-col items-center justify-center space-y-6">
                <Link href="/" className="hover:underline">Alert Dialog</Link>
                <Link href="/" className="hover:underline">Hover Card</Link>
                <Link href="/" className="hover:underline">Progress</Link>
                <Link href="/" className="hover:underline">Scroll-area</Link>
                <Link href="/" className="hover:underline">Tabs</Link>
                <Link href="/" className="hover:underline">Tooltip</Link>
            </nav>
        </div>
        <div className="footer__column flex flex-col items-center justify-center space-y-12">
            <h3>Column 1</h3>
            <nav className="footer__column__nav flex flex-col items-center justify-center space-y-6">
                <Link href="/" className="hover:underline">Alert Dialog</Link>
                <Link href="/" className="hover:underline">Hover Card</Link>
                <Link href="/" className="hover:underline">Progress</Link>
                <Link href="/" className="hover:underline">Scroll-area</Link>
                <Link href="/" className="hover:underline">Tabs</Link>
                <Link href="/" className="hover:underline">Tooltip</Link>
            </nav>
        </div>
    </footer >
);

export default Footer;
