"use client";

import React, { FC } from 'react';
import styles from './ActivityChart.module.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ActivityChartProps { }

const ActivityChart: FC<ActivityChartProps> = () => {

    const data = [
        {
            Day: 'Monday',
            Lessons: 4,
        },
        {
            Day: 'Tuesday',
            Lessons: 8,
        },
        {
            Day: 'Wednesday',
            Lessons: 7,
        },
        {
            Day: 'Thursday',
            Lessons: 5,
        },
        {
            Day: 'Friday',
            Lessons: 9,
        },
        {
            Day: 'Saturday',
            Lessons: 1,
        },
        {
            Day: 'Sunday',
            Lessons: 6,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="Day" />
                <YAxis dataKey="Lessons" />
                <Tooltip />
                <Bar type="basis" dataKey="Lessons" stroke="#141F2F" fill="#1461cc" />
            </BarChart>
        </ResponsiveContainer>
    )
};

export default ActivityChart;
