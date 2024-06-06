import Layout from "@/components/Layout/Layout";
import { Badge } from "@/components/ui/badge";
import React from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Page() {

    const sponsors: string[] = [
        "https://img.icons8.com/?size=100&id=435&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=25627&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=32292&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=447&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=12598&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=437&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=37325&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=jlpBF1fJe9fs&format=png&color=000000"
    ];
    return (
        <Layout>
            <div className="landing-content h-full" style={{
                background: `radial-gradient(circle at 70% 50%, #43d9ac30 0%, #43d9ac20 15%, transparent 30%),
    radial-gradient(circle at 50% 40%, #4d5cce30 0%, #4d5cce20 15%, transparent 30%), radial-gradient(circle at 30% 60%, #cc4dcc30 0%, #cc4dcc20 15%, transparent 30%), #FBF9F9`
            }}>
                <div className="container relative py-60 flex flex-col items-center justify-center h-full">
                    <div className="landing-content__presentation h-1/2 flex flex-col items-center justify-center space-y-2">
                        <Badge>NEW: Build on Bitcoin - Stacks Developer Degree out now !</Badge>
                        <Badge>Announcing: Uniswap Hook Incubator - do you have what it takes ?</Badge>
                        <span className="text-muted-foreground text-3xl font-medium">Lead the charge to new frontiers</span>
                        <h1 className="text-7xl font-bold">Welcome to PG2W</h1>
                        <span className="text-muted-foreground text-m font-medium">The future is now</span>
                        <div className="!mt-16">
                            <Button>Get started</Button>
                        </div>
                    </div>
                </div>
                <div className="sponsor-banner flex flex-col justify-center items-center m-0 px-0">
                    <h2 className="text-3xl font-medium">Backed by the best</h2>
                    <div className="overflow-hidden mt-2 w-full border-t bg-white whitespace-nowrap flex items-center">
                        <div className="slide-track animate-[slide_60s_linear_infinite] inline-block whitespace-nowrap content-center py-2">
                            <div className="flex space-x-60 justify-center">
                                {sponsors.map((sponsor, index) => (
                                    <Image key={index} src={sponsor} alt="" width="100" height="100" />
                                ))}
                                {sponsors.map((sponsor, index) => (
                                    <Image key={index + sponsors.length} src={sponsor} alt="" width="100" height="100" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

// export default Home;