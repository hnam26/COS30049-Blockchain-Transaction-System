import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/chart.css";

// BarChart component
const BarChart = ({ summary }) => {

    const [dayTime, setDayTime] = useState(7);
    // Sort the arrays based on 'block_timestamp'
    summary.sents.sort((a, b) => b.block_timestamp - a.block_timestamp);
    summary.receives.sort((a, b) => b.block_timestamp - a.block_timestamp);
    const groupData = (sents, receives, days) => {
        let result = {};
        let date = null;
        if (sents.length !== 0 && receives.length !== 0) {
            // Both timestamps exist, compare them
            if (sents[0].block_timestamp > receives[0].block_timestamp) {
                date = new Date(sents[0].block_timestamp * 1000);
            } else {
                date = new Date(receives[0].block_timestamp * 1000);
            }
        } else if (sents.length !== 0) {
            // Only sents timestamp exists
            date = new Date(sents[0].block_timestamp * 1000);
        } else if (receives.length !== 0) {
            // Only receives timestamp exists
            date = new Date(receives[0].block_timestamp * 1000);
        } else {
            date = new Date();
        }


        switch (days) {
            case 7:
                date.setHours(23, 59, 59, 999);
                date.setDate(date.getDate() - days);
                for (let i = 0; i < 7; i++) {
                    let dateNow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                    let day = `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;
                    let sentValue = sents
                        .filter(t => t.block_timestamp * 1000 >= date.getTime() && t.block_timestamp * 1000 <= date.getTime() + 24 * 60 * 60 * 1000)
                        .reduce((total, t) => +total + 1, 0);
                    let receiveValue = receives
                        .filter(t => t.block_timestamp * 1000 >= date.getTime() && t.block_timestamp * 1000 <= date.getTime() + 24 * 60 * 60 * 1000)
                        .reduce((total, t) => +total + 1, 0);
                    result[day] = { sent: sentValue, receive: receiveValue };
                    date.setDate(date.getDate() + 1);
                }
                break;
            case 28:
                date.setDate(date.getDate() - date.getDay() + 7);
                date.setHours(23, 59, 59, 999); // Set the time to the end of the day
                // Then, go back 28 days from that date
                date.setDate(date.getDate() - 28);
                for (let i = 0; i < 4; i++) {
                    let startDate = new Date(date.getTime());
                    let endDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
                    let week = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()} - ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
                    let sentValue = sents
                        .filter(t => t.block_timestamp * 1000 >= date.getTime() && t.block_timestamp * 1000 <= date.getTime() + 7 * 24 * 60 * 60 * 1000)
                        .reduce((total, t) => total + 1, 0);
                    let receiveValue = receives
                        .filter(t => t.block_timestamp * 1000 >= date.getTime() && t.block_timestamp * 1000 <= date.getTime() + 7 * 24 * 60 * 60 * 1000)
                        .reduce((total, t) => total + 1, 0);
                    result[week] = { sent: sentValue, receive: receiveValue };
                    date.setDate(date.getDate() + 7);
                }
                break;
            case 30 * 12:
                // First, set the date to the last day of the current month
                date.setMonth(date.getMonth() + 1, 0);
                date.setHours(23, 59, 59, 999); // Set the time to the end of the day

                // Then, go back 12 months from that date
                date.setFullYear(date.getFullYear() - 1);
                for (let i = 0; i < 12; i++) {
                    let month = `${date.getMonth() + 1}/${date.getFullYear()}`;
                    let sentValue = sents
                        .filter(t => t.block_timestamp * 1000 >= date.getTime() && t.block_timestamp * 1000 <= date.getTime() + 30 * 24 * 60 * 60 * 1000)
                        .reduce((total, t) => total + 1, 0);
                    let receiveValue = receives
                        .filter(t => t.block_timestamp * 1000 >= date.getTime() && t.block_timestamp * 1000 <= date.getTime() + 30 * 24 * 60 * 60 * 1000)
                        .reduce((total, t) => total + 1, 0);
                    result[month] = { sent: sentValue, receive: receiveValue };
                    date.setMonth(date.getMonth() + 1);
                }
                break;
            default:
                console.log("Invalid day time");
        }

        return result;
    };
    var labels = [];
    var sentData = [];
    var receiveData = [];
    if (summary) {
        var results = groupData(summary.sents, summary.receives, dayTime);

        for (let key in results) {
            if (results.hasOwnProperty(key)) { // This check is necessary to skip keys from the prototype chain
                labels.push(key);
            }
            // console.log(results[key]);
            sentData.push(results[key].sent);
            receiveData.push(results[key].receive);
        }
    }


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
                    text: "Amount",
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

    // Chart data
    const data = {
        labels: labels,
        datasets: [{
            label: "Sent",
            data: sentData,
            backgroundColor: "#F6D6D6",
            order: "1",
        },
        {
            label: "Receive",
            data: receiveData,
            backgroundColor: "#B7E5B4",
            order: "1",
        },
        ],
    };

    // Render BarChart component
    return (
        <>
            <div className="chartTransaction">
                {/* Render Bar component with chart data and options */}
                <Bar
                    data={data}
                    options={options}
                />

            </div >
            <div className="divBut">
                <button onClick={() => setDayTime(7)}>7 days</button>
                <button onClick={() => setDayTime(28)} >4 weeks</button>
                <button onClick={() => setDayTime(30 * 12)}>12 months</button>
            </div>
        </>
    );
};

// Export BarChart component
export default BarChart;
