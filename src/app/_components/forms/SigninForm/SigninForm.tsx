import React, { FC } from 'react';
import styles from './SigninForm.module.css';
import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface SigninFormProps { }

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
});

const SigninForm: FC<SigninFormProps> = () => {

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
            const response = await fetch(`http://localhost:8000/users/new`, {
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
                                Log in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SigninForm;
