"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import LoginForm from '@/components/forms/LoginForm/LoginForm';
import SigninForm from '@/components/forms/SigninForm/SigninForm';

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    address: z.string().optional(),
    country_name: z.string().optional(),
    role: z.string().optional(),
});

export default function Page() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: any) => {
        try {
            if (user) {
                const response = await fetch(`http://localhost:8000/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to put data');
                }

                const data = await response.json();
                console.log(data);
            } else {
                const response = await fetch('http://localhost:8000/users/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to post data');
                }

                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

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