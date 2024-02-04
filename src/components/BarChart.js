import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/Chart.css";

const BarChart = ({ props }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            // title: {
            //     display: true,
            //     text: 'All transactions',
            //     font: {
            //         size: "20",
            //     }
            // },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: "true",
                    text: "$",
                    font: {
                        size: "20",
                    }
                },
                padding: { top: 30, left: 0, right: 0, bottom: 0 },
            },
            x: {
                beginAtZero: true,
                padding: { top: 30, left: 0, right: 0, bottom: 0 },
            }

        }
    };


    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const transHistory = props;
        const expenseAvg = transHistory.expense.reduce((acc, expense) => acc + expense, 0) / transHistory.expense.length;
        const incomeAvg = transHistory.income.reduce((acc, income) => acc + income, 0) / transHistory.income.length;

        const data = {
            labels: transHistory.date,
            datasets: [{
                label: "Expense",
                data: transHistory.expense,
                backgroundColor: "#F6D6D6",
                order: "1",
            },
            {
                label: "Income",
                data: transHistory.income,
                backgroundColor: "#B7E5B4",
                order: "1",
            },
            {
                label: `Average Expense`,
                data: Array(transHistory.date.length).fill(expenseAvg),
                type: "line",
                borderDash: [5, 5],
                borderColor: "#FF8F8F",
                order: "0",
                pointStyle: 'circle',
                pointRadius: 0,
            },
            {
                label: `Average Income`,
                data: Array(transHistory.date.length).fill(incomeAvg),
                type: "line",
                borderDash: [5, 5],
                borderColor: "#86A789",
                order: "0",
                pointStyle: 'circle',
                pointRadius: 0,
            },
            ],

        };

        setChartData(data);
    }, [props]);
    return (
        <>
            <div className="chartTransaction">
                {chartData && (
                    <Bar
                        data={chartData}
                        options={options}
                    />
                )}
            </div >
        </>
    );
};

export default BarChart;
