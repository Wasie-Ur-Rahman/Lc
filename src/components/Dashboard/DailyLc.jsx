import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DailyLc = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://192.168.18.251:8003/GetDailyLcCount/"
        );
        console.log("Response from the api", response.data);
        const complianceData = processComplianceData(response.data);
        setChartData(complianceData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processComplianceData = (data) => {
    const labels = Object.keys(data);
    const counts = Object.values(data);

    return {
      labels: labels,
      datasets: [
        {
          label: "LC Count",
          data: counts,
          backgroundColor: "#387478",
          barThickness: 20,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          font: {
            size: 12,
            family: "sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Daily LC Count",
        font: {
          size: 24,
          family: "sans-serif",
          weight: "bold",
        },
        padding: {
          top: 1,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += context.parsed.y || "0";
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: "#EEE9DA",
        },
        title: {
          display: true,
          text: "Count of LCs",
          font: {
            size: 12,
            family: "sans-serif",
          },
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 12,
            family: "sans-serif",
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "60%", height: "450px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default DailyLc;
