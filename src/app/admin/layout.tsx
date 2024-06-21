import React, { ReactNode, Suspense } from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlobalBreadcrumb from '@/components/GlobalBreadcrumb/GlobalBreadcrumb';
import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

async function getData() {
    const response = await fetch('http://localhost:8000/courses')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function AdminLayout ({ 
    children,
} : {
    children: React.ReactNode,
}) {
    
    const data = await getData();
    
    return (
        <>
            <div className="flex w-full justify-between items-center">
                {/* <GlobalBreadcrumb courses={data}/> */}
            </div>
            <div className="flex mt-4 gap-6">
                <div className="grid w-1/3 h-fit grid-cols-1">
                    <nav className="grid gap-2 w-full grid-cols-1 justify-start">
                        <h2 className="text-lg">Courses</h2>
                        <Link href={`/admin/courses/new`}>
                            <Button variant="ghost" className={`!w-full text-start text-wrap text-muted-foreground hover:text-foreground`}>
                                <span className="w-full">Create a new course</span>
                            </Button>
                        </Link>
                        <Link href={`/admin/courses/1`}>
                            <Button variant="ghost" className={`!w-full text-start text-wrap text-muted-foreground hover:text-foreground`}>
                                <span className="w-full">Edit an existing course</span>
                            </Button>
                        </Link>
                        <Separator />
                        <h2 className="text-lg">Lessons</h2>
                        <Link href={`/admin/lessons/new`}>
                            <Button variant="ghost" className={`!w-full text-start text-wrap text-muted-foreground hover:text-foreground`}>
                                <span className="w-full">Create a new lesson</span>
                            </Button>
                        </Link>
                        <Link href={`/admin/lessons/1`}>
                            <Button variant="ghost" className={`!w-full text-start text-wrap  text-muted-foreground hover:text-foreground`}>
                                <span className="w-full">Edit an existing lesson</span>
                            </Button>
                        </Link>
                        <Separator />
                        <h2 className="text-lg">Users</h2>
                        <Link href={`/admin/users/new`}>
                            <Button variant="ghost" className={`!w-full text-start text-wrap  text-muted-foreground hover:text-foreground`}>
                                <span className="w-full">Create a new user</span>
                            </Button>
                        </Link>
                        <Link href={`/admin/users/1`}>
                            <Button variant="ghost" className={`!w-full text-start text-wrap  text-muted-foreground hover:text-foreground`}>
                                <span className="w-full">Edit an existing user</span>
                            </Button>
                        </Link>
                        {/* <Separator /> */}
                    </nav>
                </div>
            {children}
            </div>
        </>
    )
};