import React from 'react';
import MainMenu from '../_components/MainMenu/MainMenu';
import ProfileSidebar from '../_components/ProfileSidebar/ProfileSidebar';
import FAQ from '../_components/FAQ/FAQ';
import Footer from '../_components/Footer/Footer';
import { ScrollArea, ScrollBar } from '../_components/ui/scroll-area';
import UserProvider from '../_contexts/UserProvider';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getData } from '../_lib/data';

export default async function AuthentifiedLayout({
    children,
}: {
    children: React.ReactNode,
}): Promise<React.JSX.Element> {

    const userId = getCookie('userId', { cookies });
    const user: User = await getData("users", parseInt(userId)) as User;

    return (
        <div className="flex justify-between">
            <UserProvider user={ user }>
                <MainMenu />
                <ScrollArea className="grid w-full max-h-screen">
                    <div className="p-6">
                        { children }
                    </div>
                    <FAQ />
                    <Footer />
                    <ScrollBar />
                </ScrollArea>
                <ProfileSidebar />
            </UserProvider>
        </div>
    );
};
