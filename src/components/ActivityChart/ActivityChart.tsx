"use client";

import React, { FC } from 'react';
import styles from './ActivityChart.module.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityChartProps { }

const ActivityChart: FC<ActivityChartProps> = () => {

    const data = [
        {
            name: 'Monday',
            Lessons: 4,
        },
        {
            name: 'Tuesday',
            Lessons: 8,
        },
        {
            name: 'Wednesday',
            Lessons: 7,
        },
        {
            name: 'Thursday',
            Lessons: 5,
        },
        {
            name: 'Friday',
            Lessons: 9,
        },
        {
            name: 'Saturday',
            Lessons: 1,
        },
        {
            name: 'Sunday',
            Lessons: 6,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="basis" dataKey="Lessons" stroke="#141F2F" fill="#1461cc" />
            </AreaChart>
        </ResponsiveContainer>
    )
};

export default ActivityChart;
