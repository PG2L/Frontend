"use client";

import React, {
    FC,
    Suspense
} from 'react';
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
import { Button } from '../../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Skeleton } from '../../ui/skeleton';

/**
 * Represents the form schema for user data.
 */
const formSchema = z.object({
    /**
     * Represents the username field.
     * Must be at least 2 characters.
     */
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),

    /**
     * Represents the email field.
     * Must be a valid email address.
     */
    email: z.string().email({
        message: "Invalid email address.",
    }),

    /**
     * Represents the password field.
     * Must be at least 8 characters.
     */
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),

    /**
     * Represents the confirm password field.
     * Must be at least 8 characters.
     */
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),

    /**
     * Represents the firstname field.
     * Optional field.
     */
    firstname: z.string().optional(),

    /**
     * Represents the lastname field.
     * Optional field.
     */
    lastname: z.string().optional(),

    /**
     * Represents the address field.
     * Optional field.
     */
    address: z.string().optional(),

    /**
     * Represents the country name field.
     * Optional field.
     */
    country_name: z.string().optional(),

    /**
     * Represents the role field.
     * Optional field.
     */
    role: z.string().optional(),
});

interface UserFormProps {
    user?: User,
}

/**
 * UserForm component represents a form for creating or updating a user.
 *
 * @component
 * @param {UserFormProps} props - The props for the UserForm component.
 * @returns {JSX.Element} The rendered UserForm component.
 */
const UserForm: FC<UserFormProps> = ({
    user,
}: UserFormProps): React.JSX.Element => {

    /**
     * Creates a form instance using the useForm hook from react-hook-form library.
     *
     * @param {User} user - The user object containing the initial form values (optional).
     * @returns {FormInstance} The form instance with the specified resolver and default values.
     */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:
            user ? {
                username: user.username,
                email: user.email,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                address: user.address,
                country_name: user.country_name,
                role: user.role,
            } : {
                username: "",
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                address: "",
                country_name: "",
                role: "",
            },
    });

    /**
     * Handles the form submission by making a PUT request to update an existing user or a POST request to create a new user.
     * @param values - The form values to be submitted.
     * @returns A Promise that resolves when the request is successful, or rejects with an error if the request fails.
     */
    const onSubmit: (values: any) => Promise<void> = async (values: any): Promise<void> => {
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

                const data: any = await response.json();
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

                const data: any = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Suspense fallback={
            <div className="grid gap-10 md:gap-16 mt-12 w-full">
                <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-full h-10" />
                <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-24 h-10 justify-self-center" />
            </div>
        }>
            <Form // Form component for user data
                { ...form }
            >
                <form onSubmit={ form.handleSubmit(onSubmit) } className="grid gap-4 lg:gap-6 mt-6">
                    <div className="grid md:flex gap-4 lg:gap-6">

                        {/* Username field for account creation */ }
                        <FormField
                            control={ form.control }
                            name="username"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nakkarst" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a unique username that you&apos;ll use to log in and will be visible to other users on the platform. Avoid using personal information for privacy.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />

                        {/* Email field for account creation */ }
                        <FormField
                            control={ form.control }
                            name="email"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@mail.com" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your email address. We&apos;ll use it for important notifications about your courses and account security. Rest assured, we respect your privacy and won&apos;t share it with third parties.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>
                    <div className="grid gap-4 sm:flex lg:gap-6">

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
                                        Create a strong password to protect your account. It should be at least 8 characters long and include a mix of letters, numbers, and symbols.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />

                        {/* Confirm password field with validation and description */ }
                        <FormField
                            control={ form.control }
                            name="confirmPassword"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Re-enter your password to confirm it. This ensures that you&apos;ve typed your password correctly.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>
                    <div className="grid gap-4 sm:flex lg:gap-6">

                        {/* First name field */ }
                        <FormField
                            control={ form.control }
                            name="firstname"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your first name. This will help us personalize your learning experience.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />

                        {/* Last name field */ }
                        <FormField
                            control={ form.control }
                            name="lastname"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your last name. This will be used along with your first name to personalize your certificates of completion.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>

                    {/* Address field with description */ }
                    <FormField
                        control={ form.control }
                        name="address"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="1234 Main St" { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Provide your full address. This information might be used for billing purposes or sending physical materials related to your courses.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <div className="grid md:flex gap-4 lg:gap-6">

                        {/* Country name field */ }
                        <FormField
                            control={ form.control }
                            name="country_name"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Country Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="United States" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Select your country from the list. This helps us offer you region-specific content and comply with local laws.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />

                        {/* Role field */ }
                        <FormField
                            control={ form.control }
                            name="role"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Admin" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Indicate your current role or the role you&apos;re aspiring to. This information helps us recommend the most relevant courses for your career path.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>

                    {/* Submit button */ }
                    <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                </form>
            </Form>
        </Suspense>
    );
};

export default UserForm;
