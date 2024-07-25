"use client";

import React, {
    FC,
    useState,
} from 'react';
import styles from './SigninForm.module.css';
import Link from 'next/link';
import { Button } from '@/_components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/_components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Spinner } from '@/_components/ui/spinner';
import { useRouter } from 'next/navigation';
import { useToast } from "@/_components/ui/use-toast";

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
     * Represents the state of whether the form is pending or not.
     */
    const [isPending, setIsPending] = useState(false);

    /**
     * The toast object used for displaying notifications.
     */
    const { toast } = useToast();

    /**
     * Submits the form data to the server.
     * @param values - The form values to be submitted.
     * @returns A Promise that resolves when the data is successfully submitted.
     */
    const onSubmit: (values: any) => Promise<void> = async (values: any): Promise<void> => {
        setIsPending(true);
        await fetch(`http://localhost:8000/users/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then((response: Response): void => {
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            toast({
                title: 'Account created',
                description: 'You can now log in with your new account.',
            });
            window.location.reload();
            setIsPending(false);
        });
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
                        <FormField
                            control={ form.control }
                            name="username"
                            render={ ({ field }): React.JSX.Element => (
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
                            render={ ({ field }): React.JSX.Element => (
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
                            render={ ({ field }): React.JSX.Element => (
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
                            { isPending ?
                                <Spinner /> : "Create an account"
                            }
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button>
                    </form>
                    <div className="mt-4 text-center ">
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
