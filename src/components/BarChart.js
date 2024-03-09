import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/chart.css";
import { ProcessBarData } from "../data/Process";
import { useParams } from "react-router-dom";
// BarChart component
const BarChart = ({ props: { nodes, links } }) => {
    const params = useParams();
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'All transactions',
                font: {
                    size: "20",
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
                padding: { top: 30, left: 0, right: 0, bottom: 0 },
            }
        }
    };

    // State for chart data
    const [chartData, setChartData] = useState(null);
    const values = ProcessBarData(links, params.id);
    // useEffect to update chart data
    useEffect(() => {

        var sent = 0;
        values.forEach(value => {
            sent += +value.sent;
        });
        const sentAvg = sent / values.length;
        var receive = 0;
        values.forEach(value => {
            receive += value.receive;
        });
        const receiveAvg = receive / values.length;
        // Chart data
        const data = {
            labels: values.map((value) => value.date),
            datasets: [{
                label: "Sent",
                data: values.map((value) => +value.sent),
                backgroundColor: "#F6D6D6",
                order: "1",
            },
            {
                label: "Receive",
                data: values.map((value) => +value.receive),
                backgroundColor: "#B7E5B4",
                order: "1",
            },
            {
                label: `Average Sent`,
                data: Array(values.length).fill(sentAvg),
                type: "line",
                borderDash: [5, 5],
                borderColor: "#FF8F8F",
                order: "0",
                pointStyle: 'circle',
                pointRadius: 0,
            },
            {
                label: `Average Receive`,
                data: Array(values.length).fill(receiveAvg),
                type: "line",
                borderDash: [5, 5],
                borderColor: "#86A789",
                order: "0",
                pointStyle: 'circle',
                pointRadius: 0,
            },
            ],
        };

        // Set chart data
        setChartData(data);
    }, [nodes, links]);

    // Render BarChart component
    return (
        <div className="chartTransaction">
            {/* Render Bar component with chart data and options */}
            {chartData && (
                <Bar
                    data={chartData}
                    options={options}
                />
            )}
        </div >
    );
};

// Export BarChart component
export default BarChart;
