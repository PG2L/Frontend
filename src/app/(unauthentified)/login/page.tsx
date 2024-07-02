"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/forms/LoginForm/LoginForm';
import SigninForm from '@/components/forms/SigninForm/SigninForm';

export default function Page() {

    return (
        <>
            <Tabs defaultValue="signup" className="max-w-[400px] m-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
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