"use client";

import React, { FC } from 'react';
import styles from './LanguagesPieChart.module.css';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'JavaScript', value: 800 },
    { name: 'Php', value: 300 },
    { name: 'Java', value: 300 },
    { name: 'C++', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#ff28ac', '#FF8042'];

interface LanguagesPieChartProps { }

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={ x } y={ y } fill="white" textAnchor={ x > cx ? 'start' : 'end' } dominantBaseline="central" className="font-medium text-xl">
            { data[index].name }
        </text>
    );
};

const LanguagesPieChart: FC<LanguagesPieChartProps> = () => (
    <div className="h-full w-full">
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={ data }
                    cx={ 120 }
                    cy={ 200 }
                    labelLine={ false }
                    innerRadius={ 60 }
                    outerRadius={ 80 }
                    fill="#8884d8"
                    paddingAngle={ 5 }
                    dataKey="value"
                    blendStroke={ true }
                    label={ renderCustomizedLabel }
                >
                    { data.map((entry, index) => (
                        <Cell key={ `cell-${index}` } fill={ COLORS[index % COLORS.length] } />
                    )) }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default LanguagesPieChart;
