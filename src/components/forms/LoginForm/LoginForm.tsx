import React, { FC } from 'react';
import styles from './LoginForm.module.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps { }

const LoginForm: FC<LoginFormProps> = () => {

    const onSubmit = async (values: any) => {
        try {
            const response = await fetch(`http://localhost:8000/api/login_check`, {
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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="min-w-80">
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
    );
};

export default LoginForm;
