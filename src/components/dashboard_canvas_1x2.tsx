"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Pie } from "react-chartjs-2";
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

export default function Canvas_1x2({ type }: { type: string }) {
  if (type === "pie") {
    return (
      <>
        <ItemTitle type="pie" />
        <div className="w-full h-full mx-auto">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </>
    );
  }

  return null;
}
