"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/_components/ui/chart";

const chartData = [
    { day: "monday", lessons: 3, fill: "var(--color-monday)" },
    { day: "tuesday", lessons: 5, fill: "var(--color-tuesday)" },
    { day: "wednesday", lessons: 1, fill: "var(--color-wednesday)" },
    { day: "thursday", lessons: 4, fill: "var(--color-thursday)" },
    { day: "friday", lessons: 2, fill: "var(--color-friday)" },
];

const chartConfig = {
    lessons: {
        label: "Lessons",
    },
    monday: {
        label: "Monday",
        color: "hsl(var(--chart-1))",
    },
    tuesday: {
        label: "Tuesday",
        color: "hsl(var(--chart-2))",
    },
    wednesday: {
        label: "Wednesday",
        color: "hsl(var(--chart-3))",
    },
    thursday: {
        label: "Thursday",
        color: "hsl(var(--chart-4))",
    },
    friday: {
        label: "Friday",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export function ActivityChart() {
    return (

        <div className="w-full grid min-w-[280px]">
            <ChartContainer config={ chartConfig }>
                <BarChart accessibilityLayer data={ chartData }>
                    <CartesianGrid vertical={ false } />
                    <XAxis
                        dataKey="day"
                        tickLine={ false }
                        tickMargin={ 10 }
                        axisLine={ false }
                        tickFormatter={ (value) =>
                            chartConfig[value as keyof typeof chartConfig]?.label
                        }
                    />
                    <ChartTooltip
                        cursor={ false }
                        content={ <ChartTooltipContent hideLabel /> }
                    />
                    <Bar
                        dataKey="lessons"
                        strokeWidth={ 2 }
                        radius={ 8 }
                        activeIndex={ 4 }
                        activeBar={ ({ ...props }) => {
                            return (
                                <Rectangle
                                    { ...props }
                                    fillOpacity={ 0.8 }
                                    stroke={ props.payload.fill }
                                    strokeDasharray={ 4 }
                                    strokeDashoffset={ 4 }
                                />
                            );
                        } }
                    />
                </BarChart>
            </ChartContainer>
        </div>

    );
}
