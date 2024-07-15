import React, { FC } from 'react';
import styles from './SideBar.module.css';
import { icons } from 'lucide-react';
import { cn } from '@/_lib/utils';
import { Button } from '@/_components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/_components/ui/sheet";
import { Separator } from '@/_components/ui/separator';


interface SideBarProps {
    className?: string;
}

const SideBar: FC<SideBarProps> = ({ className }): React.JSX.Element => (
    <div className={ cn(className) }>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <icons.Menu width="32" height="32" />
                </Button>
            </SheetTrigger>
            <SheetContent side={ "left" }>
                <SheetHeader>
                    <SheetTitle className="text-lg">Menu</SheetTitle>
                    <SheetDescription>
                        Make your way through the app
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col mt-6 gap-1 w-full justify-start">
                    <Button variant="ghost" className="flex gap-2">
                        <icons.Home width="24" height="24" />
                        Home
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                        <icons.Bell width="24" height="24" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                        <icons.MessageSquare width="24" height="24" />
                        Messages
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                        <icons.Book width="24" height="24" />
                        Bookmarks
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                        <icons.UserPlus width="24" height="24" />
                        Friends
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                        <icons.Globe width="24" height="24" />
                        Explore
                    </Button>
                    <Separator />
                    <Button variant="ghost" className="flex gap-2">
                        <icons.User width="24" height="24" />
                        Profile
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                        <icons.Settings width="24" height="24" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                        <icons.LogOut width="24" height="24" />
                        Log out
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    </div>
);

export default SideBar;
