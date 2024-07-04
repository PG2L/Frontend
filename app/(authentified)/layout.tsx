import React from 'react';
import MainMenu from '../_components/MainMenu/MainMenu';
import ProfileSidebar from '../_components/ProfileSidebar/ProfileSidebar';
import FAQ from '../_components/FAQ/FAQ';
import Footer from '../_components/Footer/Footer';
import { ScrollArea, ScrollBar } from '../_components/ui/scroll-area';
import UserProvider from '../_contexts/UserProvider';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function AuthentifiedLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    const userId = getCookie('userId', { cookies });

    const getUser: (id: any) => Promise<void> = async (id: any) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const user = await getUser(userId);
    // console.log(user);
    return (
        <>
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
        </>
    );
};
