import Layout from "@/components/Layout/Layout";
import { Badge } from "@/components/ui/badge";
import React from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Page() {

  const sponsors: string[] = [
    "https://img.icons8.com/?size=100&id=30888&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=OBMhWEebAWe9&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=8818&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=59813&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=8808&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=37326&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=zuHqpgzrusU5&format=png&color=000000"
  ];
  return (
    <Layout>
      <div className="landing-content h-[96vh]" style={{
        background: `radial-gradient(circle at 70% 50%, #43d9ac70 0%, #43d9ac1d 15%, transparent 30%),
    radial-gradient(circle at 50% 40%, #4d5cce70 0%, #4d5cce38 15%, transparent 30%), radial-gradient(circle at 30% 60%, #cc4dcc70 0%, #cc4dcc38 15%, transparent 30%), white`
      }}>
        <div className="container relative py-auto flex flex-col items-center justify-end space-y-24 h-full">
          <div className="landing-content__presentation flex flex-col items-center justify-center space-y-2">
            <Badge>NEW: Build on Bitcoin - Stacks Developer Degree out now !</Badge>
            <Badge>Announcing: Uniswap Hook Incubator - do you have what it takes ?</Badge>
            <span className="text-muted-foreground text-3xl font-medium">Lead the charge to new frontiers</span>
            <h1 className="text-7xl font-bold">Welcome to PG2W</h1>
            <span className="text-muted-foreground text-m font-medium">The future is now</span>
          </div>
          <div className="landing-content__bottom h-1/4 mt-14 flex flex-col justify-center items-center relative bottom-0">
            <Button>Get started</Button>
            <h2 className="text-3xl font-medium mt-20">They sponsor us</h2>
          </div>
        </div>
      </div>
      <div className="sponsor-banner border-t flex flex-col justify-center items-center py m-0 px-0">
        <div className="overflow-hidden w-full h-[100px] whitespace-nowrap">
          <div className="slide-track animate-[slide_120s_linear_infinite] inline-block whitespace-nowrap">
            <div className="flex space-x-60">
              {sponsors.map((sponsor, index) => (
                <Image key={index} src={sponsor} alt="" width="100" height="100"/>
              ))}
              {sponsors.map((sponsor, index) => (
                <Image key={index + sponsors.length} src={sponsor} alt="" width="100" height="100"/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// export default Home;