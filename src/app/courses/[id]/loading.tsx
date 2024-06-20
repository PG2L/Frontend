import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { icons } from 'lucide-react';
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <>
                <Card className="outline outline-1 outline-primary">
                    <CardHeader>
                        <Skeleton className="hidden sm:block py-36 rounded"/>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="w-4/5 h-6 rounded"/>
                        <Skeleton className="mt-4 w-3/5 h-6 rounded"/>
                    </CardContent>
                    <CardFooter>
                        <Suspense fallback={<Skeleton className="w-1/2 h-12 rounded"/>}>
                        <div className="grid w-full grid-cols-1 sm:flex sm:justify-between gap-6">
                            <div className="flex items-end gap-6">
                                <div className="flex gap-1">
                                    <icons.BookUser strokeWidth={1} color="#1461cc" />
                                    <span className="text-muted-foreground">18 000+ students</span>
                                </div>
                                <div className="flex gap-1">
                                    <icons.Clock strokeWidth={1} color="#1461cc" />
                                    <span className="text-muted-foreground">5h</span>
                                </div>
                            </div>
                            <Button size="lg" className="w-full sm:w-1/2">Continue</Button>
                        </div>
                        </Suspense>
                    </CardFooter>
                </Card>
                <Card className="text-muted-foreground">
                    <CardHeader>

                    </CardHeader>
                </Card>
        </>
    );
}