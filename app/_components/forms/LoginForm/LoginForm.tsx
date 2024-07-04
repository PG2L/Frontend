"use client";

import React, { FC } from 'react';
import styles from './LoginForm.module.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { setCookie } from "cookies-next";


interface LoginFormProps { }

function LoginButton() {
    const { pending } = useFormStatus();

    function handleClick(event: any): void {
        if (pending) {
            event.preventDefault();
        }
    }

    return (
        <Button aria-disabled={ pending } type="submit" onClick={ handleClick }>
            Login
        </Button>
    );
}

const LoginForm: FC<LoginFormProps> = () => {

    // const [errorMessage, dispatch] = useFormState(login, undefined);

    const form = useForm({
        resolver: zodResolver(z.object({
            username: z.string().min(2, {
                message: "Username must be at least 2 characters.",
            }),
            password: z.string().min(8, {
                message: "Password must be at least 8 characters.",
            }),
        })),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const router = useRouter();

    const onSubmit = async (values: any) => {
        try {
            const response = await fetch('http://localhost:8000/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            console.log(data);
            if (data.token) {
                setCookie('currentUser', data.token);
                setCookie('userId', data.userId);
                router.push('/home');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="min-w-80">
            <CardHeader>
                <CardTitle className="text-lg">Log In</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
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
                            {/* <div>{ errorMessage && <p>{ errorMessage }</p> }</div> */ }
                            <LoginButton />
                            <Button variant="outline" className="w-full">
                                Log in with GitHub
                            </Button>
                        </div>
                        <div className="mt-4 text-center ">
                            Don&apos;t have an account?{ " " }
                            <Link href="#" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
