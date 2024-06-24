import React, { Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import * as icons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';


async function getData() {
    const response = await fetch('http://localhost:8000/courses')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Page() {
    const data = await getData();

    return (
        <div className="flex justify-between gap-6">
            .
            <ProfileSidebar />
        </div>
    );
}