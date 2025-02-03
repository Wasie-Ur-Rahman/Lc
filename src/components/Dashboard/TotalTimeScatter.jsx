import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement, // Register LineElement to enable line drawing
    Title,
    Tooltip,
    Legend
);

const TotalTimeScatter = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://192.168.18.251:8010/Stats_getLC_Total_Time_Seconds/');
                console.log("API Data:", response.data);
                const scatterData = processScatterData(response.data);
                setChartData(scatterData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const processScatterData = (data) => {
        const filteredData = data.filter(item => item.LC_ID); // Filter out empty LC_ID

        // Map the data to point plot format
        const points = filteredData.map((item) => ({
            x: item.LC_ID, // Use LC_ID for X-axis
            y: item.TTs // Use TTs (Total Time in Seconds) for Y-axis
        }));

        return {
            labels: filteredData.map(item => item.LC_ID), // Store LC_ID for tooltips
            datasets: [
                {
                    label: 'Total Time in Seconds per LC',
                    data: points,
                    backgroundColor: '#750E21',
                    borderColor: '#750E21',
                    pointBorderColor: '#750E21',
                    pointBackgroundColor: '#750E21',
                    pointRadius: 6, // Size of points
                    pointStyle: 'circle', // You can change this to any other style like 'rect', 'triangle', etc.
                    borderWidth: 2, // Thickness of the connecting line
                    showLine: true, // Enable the line connecting points
                    tension: 0.4, // Optional: Adds curvature to the line (0 for straight lines)
                }
            ]
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'LC Total Time in Seconds (Points)',
                font: {
                    size: 24,
                    family: 'sans-serif',
                    weight: 'bold'
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += `${context.raw.y} seconds`; // Show seconds on tooltip
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'category', // Use category scale to properly map LC_IDs
                title: {
                    display: true,
                    text: 'LC ID',
                    font: {
                        size: 12,
                        family: 'sans-serif'
                    }
                },
                ticks: {
                    font: {
                        size: 12,
                        family: 'sans-serif'
                    }
                },
                grid: {
                    display: false, // Optional: Hide grid lines
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Time in Seconds',
                    font: {
                        size: 12,
                        family: 'sans-serif'
                    }
                },
                ticks: {
                    beginAtZero: true, // Start Y-axis at zero
                    font: {
                        size: 12,
                        family: 'sans-serif'
                    }
                },
                grid: {
                    color: '#E0E0E0', // Optional: Set grid color
                },
            }
        }
    };

    return (
        <div style={{ width: '60%', height: '500px', }} className=''>
            {loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : <Scatter data={chartData} options={options} />}
        </div>
    );
};

export default TotalTimeScatter;
