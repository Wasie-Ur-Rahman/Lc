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

const LCStatusChartReplica = () => {
  const [data, setData] = useState(null);
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
          "https://192.168.18.251:8003/getLastProcessedLC/"
        );
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
    // Extract compliance information from API response
    const processedData = [];

    Object.keys(data).forEach((key) => {
      if (key.startsWith("Complient")) {
        const complianceEntries = data[key].split("|");
        complianceEntries.forEach((entry) => {
          const [totalCompliance, compliantSuccess] = entry
            .split("-")
            .map(Number);
          const unsuccessfulCompliance = totalCompliance - compliantSuccess;

          processedData.push({
            complianceType: key,
            totalCompliance,
            compliantSuccess,
            unsuccessfulCompliance,
          });
        });
      }
    });

    // Prepare chart data
    const labels = processedData.map(
      (item) => `${item.complianceType} (${item.totalCompliance})`
    );
    const totalComplianceData = processedData.map(
      (item) => item.totalCompliance
    );
    const successComplianceData = processedData.map(
      (item) => item.compliantSuccess
    );
    const unsuccessfulComplianceData = processedData.map(
      (item) => item.unsuccessfulCompliance
    );

    return {
      labels: labels,
      datasets: [
        {
          label: "Total Compliance",
          data: totalComplianceData,
          backgroundColor: "#4CAF50",
          barThickness: 10,
        },
        {
          label: "Compliance Success",
          data: successComplianceData,
          backgroundColor: "#FF9800",
          barThickness: 10,
        },
        // ,
        // {
        //     label: 'Unsuccessful Compliance',
        //     data: unsuccessfulComplianceData,
        //     backgroundColor: '#F44336',
        //     barThickness: 10,
        // }
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
        text: "LC Status Overview",
        font: {
          size: 24,
          family: "sans-serif",
          weight: "bold",
        },
        padding: {
          top: 15,
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
        barPercentage: 2, // Adjust this for space between bars within the same category
        categoryPercentage: 2, // Adjust this for space between categories
        ticks: {
          font: {
            size: 10,
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
          text: "No. of LCs",
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
    <div style={{ width: "60%", height: "460px" }} className="">
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

export default LCStatusChartReplica;
