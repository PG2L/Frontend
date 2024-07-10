"use client";

import React, { FC } from 'react';
import styles from './SigninForm.module.css';
import Link from 'next/link';
import { Button } from '../../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '../../ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface SigninFormProps { }

/**
 * Represents the form schema for the SigninForm component.
 */
const formSchema = z.object({
    /**
     * Represents the username field in the form.
     * Must be at least 2 characters long.
     */
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),

    /**
     * Represents the email field in the form.
     * Must be a valid email address.
     */
    email: z.string().email({
        message: "Invalid email address.",
    }),

    /**
     * Represents the password field in the form.
     * Must be at least 8 characters long.
     */
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

/**
 * Represents the login form component.
 * @component
 */
const SigninForm: FC<SigninFormProps> = ({ }: SigninFormProps): React.JSX.Element => {

    /**
     * Creates a form instance with default values and a resolver.
     *
     * @returns The form instance.
     */
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    /**
     * Submits the form data to the server.
     * @param values - The form values to be submitted.
     * @returns A Promise that resolves when the data is successfully submitted.
     */
    const onSubmit: (values: any) => Promise<void> = async (values: any): Promise<void> => {
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

            const data: any = await response.json();
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
                    <form onSubmit={ form.handleSubmit(onSubmit) } className="grid gap-4">

                        {/* Username field for account creation */ }
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

                        {/* Email field for account creation */ }
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

                        {/* Password field with validation and description */ }
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
                        {/* Button to submit the form and create an account */ }
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                        {/* Alternative option to sign up using GitHub */ }
                        <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button>
                    </form>
                    <div className="mt-4 text-center ">
                        {/* Link for users who already have an account to log in */ }
                        Already have an account?{ " " }
                        <Link href="#" className="underline">
                            Log in
                        </Link>
                    </div>
                </Form>
            </CardContent>
        </Card>

    );
};

export default SigninForm;
