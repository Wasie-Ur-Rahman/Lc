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

const NC_Field_Count = () => {
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
          "http://127.0.0.1:8003/Stats_getLC_NC_FIELDS_COUNT/"
        );
        console.log("Response from the API:", response.data);

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
    // Extract keys and values from the API response
    const labels = Object.keys(data); // Variables (e.g., "48", "57A")
    const counts = Object.values(data); // Corresponding counts (e.g., 1, 2)

    return {
      labels: labels,
      datasets: [
        {
          label: "LC Fields Count",
          data: counts,
          backgroundColor: "#4F6F52",
          barThickness: 9, // Thicker bars for better visibility
        },
      ],
    };
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
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
        text: "Non Complied Fields Count",

        font: {
          size: 24,
          family: "sans-serif",
          weight: "bold",
        },
        padding: {
          top: 10,
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
            label += context.parsed.x || "0";
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
          color: "#E0E0E0",
        },
        title: {
          display: true,
          text: "Fields",
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
    <div style={{ width: "60%", height: "500px" }} className="">
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

export default NC_Field_Count;
