'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './MobileHeader.module.css';
import * as icons from 'lucide-react';
import { SheetContent, SheetTrigger, Sheet } from '@/_components/ui/sheet';
import MainMenu from '@/_components/MainMenu/MainMenu';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';

interface MobileHeaderProps { }

const MobileHeader: FC<MobileHeaderProps> = (): React.JSX.Element => {

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setShow(false);
        } else {
            setShow(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <div className={ `md:hidden absolute top-0 left-0 z-50 w-full bg-card/50 backdrop-blur-lg border border-b px-2 sm:px-6 py-2 flex justify-between items-center ${show ? 'block' : 'hidden'}` }>
            <Sheet>
                <SheetTrigger>
                    <icons.LucideMenu size={ 64 } className="text-foreground" />
                </SheetTrigger>
                <SheetContent side="left" className="!max-w-[250px]">
                    <MainMenu />
                </SheetContent>
            </Sheet>
            <Sheet>
                <SheetTrigger>
                    <icons.UserCircleIcon size={ 64 } className="text-primary" />
                </SheetTrigger>
                <SheetContent>
                    <ProfileSidebar />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileHeader;;
