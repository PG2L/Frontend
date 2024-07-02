"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/ui/tabs';
import LoginForm from '@/app/_components/forms/LoginForm/LoginForm';
import SigninForm from '@/app/_components/forms/SigninForm/SigninForm';

export default function Page() {

    return (
        <>
            <Tabs defaultValue="login" className="max-w-[400px] m-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Log In</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                    <SigninForm />
                </TabsContent>
            </Tabs>
        </>
    );
}