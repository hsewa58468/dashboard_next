"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import Outlabels from "@energiency/chartjs-plugin-piechart-outlabels";
import ItemTitle from "@/components/tools/Item_title";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, Outlabels);

const pieData = {
  labels: ["蘋果", "香蕉", "葡萄", "荔枝", "芒果", "西瓜", "鳳梨", "橘子"],
  datasets: [
    {
      radius: "100%",
      data: [20, 15, 11, 13, 3, 9, 10, 11],
      backgroundColor: [
        "#3b82f6",
        "#ef4444",
        "#22c55e",
        "#f59e0b",
        "#6b7280",
        "#ec4899",
        "#10b981",
        "#8b5cf6",
      ],
      borderWidth: 1,
      hoverOffset: 15,
    },
  ],
};
const lineData = {
  labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
  datasets: [
    {
      label: "銷售額",
      data: [20, 60, 40, 80, 55, 70],
      borderColor: "#3b82f6",
      backgroundColor: "#93c5fd",
      fill: false,
      tension: 0.4,
      pointBackgroundColor: "#ef4444",
    },
    {
      label: "成本",
      data: [10, 45, 30, 60, 35, 50],
      borderColor: "#3b82f6",
      backgroundColor: "#93c5fd",
      fill: false,
      tension: 0.4,
      pointBackgroundColor: "#ef4444",
    },
  ],
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20,
  },

  plugins: {
    legend: {
      display: true,
      position: "right" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 5,
        color: "#444",
        font: {
          size: 10, // 字體大小
        },
        padding: 7,
      },
    },
    datalabels: {
      display: false,
    },
    outlabels: {
      text: "%p",
      color: "black",
      stretch: 5,
      backgroundColor: "transparent",
      lineWidth: 1,
    },
  },
};
const lineOptions = {
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function Canvas_1x2({ type }: { type: string }) {
  if (type === "pie") {
    return (
      <>
        <ItemTitle typeName="pie" />
        <div className="w-full h-full mx-auto">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </>
    );
  }
  if (type === "line") {
    return (
      <>
        <ItemTitle typeName="line" />
        <Line
          data={lineData}
          options={lineOptions}
          style={{ width: 100, height: 100 }}
        />
      </>
    );
  }

  return null;
}
