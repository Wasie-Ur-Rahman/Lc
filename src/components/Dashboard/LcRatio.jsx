import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    true_count: 0,
    false_count: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://192.168.18.251:8010/Stats_getLC_FC_RATIO/');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('myDonutChart').getContext('2d');
    const myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['True Count', 'False Count'],
        datasets: [
          {
            label: 'Counts',
            data: [chartData.true_count, chartData.false_count],
            backgroundColor: ['#39AEA9', '#A2D5AB'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'LC Ratio',
            font: {
              size: 24,
              family: 'sans-serif',
              weight: 'bold',
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });

    return () => {
      myDonutChart.destroy(); // Clean up the chart when the component unmounts
    };
  }, [chartData]);

  return (
    <div style={{ width: '50%', height: '400px' }} className='flex flex-row justify-center items-center '>
      <canvas id="myDonutChart"></canvas>
    </div>
  );
};

export default DonutChart;
