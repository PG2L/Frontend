"use client";

import * as React from "react";
import { icons } from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/_components/ui/card";
import { ChartConfig, ChartContainer } from "@/_components/ui/chart";
import { UserContext } from "@/_contexts/UserProvider";
import { getLevelByExp } from "@/_lib/levels";

export function LevelDisplayer() {

    const user: User = React.useContext(UserContext) as User;

    const [level, exp] = getLevelByExp(user.total_exp);

    const progress = Math.round((exp / level.expToNext) * 360);

    const chartData = [
        { level: level.level, exp: exp, fill: "var(--color-level)" },
    ];

    const chartConfig = {
        exp: {
            label: "Exp",
        },
        level: {
            label: "Level",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    return (
        <>
            <CardContent className="items-center">
                <ChartContainer
                    config={ chartConfig }
                    className="mx-auto aspect-square max-h-[250px] w-full"
                >
                    <RadialBarChart
                        data={ chartData }
                        startAngle={ 0 }
                        endAngle={ progress }
                        innerRadius={ 80 }
                        outerRadius={ 130 }
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={ false }
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={ [86, 74] }
                        />
                        <RadialBar dataKey="exp" background cornerRadius={ 3 } />
                        <PolarRadiusAxis tick={ false } tickLine={ false } axisLine={ false }>
                            <Label
                                content={ ({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={ viewBox.cx }
                                                y={ viewBox.cy }
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={ viewBox.cx }
                                                    y={ (viewBox.cy || 0) - 32 }
                                                    className="fill-muted-foreground text-lg"
                                                >
                                                    Level
                                                </tspan>
                                                <tspan
                                                    x={ viewBox.cx }
                                                    y={ (viewBox.cy || 0) }
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    { chartData[0].level.toLocaleString() }
                                                </tspan>
                                                <tspan
                                                    x={ viewBox.cx }
                                                    y={ (viewBox.cy || 0) + 32 }
                                                    className="fill-foreground text-lg"
                                                >
                                                    { level.name }
                                                </tspan>
                                            </text>
                                        );
                                    }
                                } }
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <p className="text-center flex text-xl w-full items-center justify-center gap-2 ms-4">
                { exp } / { level.expToNext } <icons.Medal className="size-8 text-primary" strokeWidth={ 1 } />
            </p>
        </>
    );
}
