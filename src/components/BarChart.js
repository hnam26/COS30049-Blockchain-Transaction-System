import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/Chart.css";
import { getRevenue } from "../data/revenueData";

const BarChart = ({ props }) => {
    const revenueData = props.revenue;

    var expenseAvg = (revenueData.reduce((acc, data) => acc + data.expense, 0)) / revenueData.length;
    var incomeAvg = (revenueData.reduce((acc, data) => acc + data.income, 0)) / revenueData.length;


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: '',
                font: {
                    size: "25",
                }
            },
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
                title: {
                    display: "true",
                    text: "Date",
                    font: {
                        size: "20",
                    }
                },
                padding: { top: 30, left: 0, right: 0, bottom: 0 },
            }

        }
    };
    const data = {
        labels: revenueData.map((data) => data.date),
        datasets: [{
            label: "Expense",
            data: revenueData.map((data) => data.expense),
            backgroundColor: "#F6D6D6",
            order: "1",
        },
        {
            label: "Income",
            data: revenueData.map((data) => data.income),
            backgroundColor: "#B7E5B4",
            order: "1",
        },
        {
            label: `Average Expense`,
            data: Array(revenueData.length).fill(expenseAvg),
            type: "line",
            borderDash: [5, 5],
            borderColor: "#FF8F8F",
            order: "0",
            pointStyle: 'circle',
            pointRadius: 0,
        },
        {
            label: `Average Income`,
            data: Array(revenueData.length).fill(incomeAvg),
            type: "line",
            borderDash: [5, 5],
            borderColor: "#86A789",
            order: "0",
            pointStyle: 'circle',
            pointRadius: 0,
        },
        ],

    };
    return (
        <div className="chartTransaction">
            <p>Summary</p>
            <Bar
                data={data}
                options={options}
            />
        </div >
    );
};

export default BarChart;
