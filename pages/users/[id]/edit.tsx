"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/router';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import Link from 'next/link';

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
    firstname: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    adress: z.string().min(10, {
        message: "Address must be at least 10 characters.",
    }),
    country_name: z.string().min(2, {
        message: "Country name must be at least 2 characters.",
    }),
    role: z.string().min(2, {
        message: "Role must be at least 2 characters.",
    }),
})

async function getData(id: number) {

    const res = await fetch(`http://localhost:8000/users/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            adress: "",
            country_name: "",
            role: "",
        },
    });

    const [data, setData] = useState<null | any>(null);

    useEffect(() => {
        getData(id)
            .then(data => {
                setData(data);
                form.setValue("username", data.username);
                form.setValue("email", data.email);
                form.setValue("password", data.password);
                form.setValue("confirmPassword", data.confirmPassword);
                form.setValue("firstname", data.firstname);
                form.setValue("lastname", data.lastname);
                form.setValue("adress", data.adress);
                form.setValue("country_name", data.country_name);
                form.setValue("role", data.role);
            })
            .catch(error => console.error(error));
    }, [id]);

    const onSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${id}`, {
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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            {data &&
                <>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/users/${data.id}`}>{data && data.username}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit profile</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="mt-6"><span className="text-muted-foreground">Edit user :</span> {data && data.email} - "{data && data.username}"</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 lg:gap-6 mt-6 mx-auto">
                            <div className="grid md:flex gap-4 lg:gap-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nakkarst" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="example@mail.com" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                We'll never share your email.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4 sm:flex lg:gap-6">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Must be at least 8 characters.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4 sm:flex lg:gap-6">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="adress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1234 Main St" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid md:flex gap-4 lg:gap-6">
                                <FormField
                                    control={form.control}
                                    name="country_name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Country Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="United States" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Role</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Admin" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                        </form>
                    </Form>
                </>
            }
        </Layout>
    )
}