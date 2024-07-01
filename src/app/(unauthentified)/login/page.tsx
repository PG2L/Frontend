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
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <label htmlFor="password">Password</label>
                                        <Link href="#" className="ml-auto inline-block  underline">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </div>
                            <div className="mt-4 text-center ">
                                Don&apos;t have an account?{ " " }
                                <Link href="#" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Sign In</CardTitle>
                            <CardDescription>
                                Enter your information to create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form { ...form }>
                                <form onSubmit={ form.handleSubmit(onSubmit) }>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={ form.control }
                                            name="username"
                                            render={ ({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nakkarst" { ...field } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            ) }
                                        />
                                        <FormField
                                            control={ form.control }
                                            name="email"
                                            render={ ({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="example@mail.com" { ...field } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            ) }
                                        />
                                        <FormField
                                            control={ form.control }
                                            name="password"
                                            render={ ({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" { ...field } />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Must be at least 8 characters.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            ) }
                                        />
                                        <Button type="submit" className="w-full">
                                            Create an account
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            Sign up with GitHub
                                        </Button>
                                    </div>
                                    <div className="mt-4 text-center ">
                                        Already have an account?{ " " }
                                        <Link href="#" className="underline">
                                            Sign in
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}