"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import CircleProgress from "@/components/custom_progress_chart";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Outlabels from "@energiency/chartjs-plugin-piechart-outlabels";

import ItemTitle from "@/components/tools/ItemTitle";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  ChartDataLabels,
  Outlabels
);

const pieData = {
  labels: ["蘋果", "香蕉", "葡萄", "荔枝", "芒果", "西瓜", "鳳梨", "橘子"],
  datasets: [
    {
      radius: "80%",
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
  layout: {
    padding: 10, // 將 padding 增加
  },
  plugins: {
    legend: {
      display: false,
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

const barData = {
  labels: ["A", "B", "C", "D"],
  datasets: [
    {
      label: "數值",
      data: [60, 30, 80, 45],
      backgroundColor: ["#3b82f6", "#ef4444", "#22c55e", "#fbbf24"],
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

const lineOptions = {
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function Canvas_1x1({ type }: { type: string }) {
  if (type === "pie") {
    return (
      <>
        <ItemTitle type="pie" />
        <div className="w-3/4 h-auto px-4">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="legend-container scrollbar-custom max-h-[90px] overflow-y-auto flex flex-row flex-wrap mx-auto pl-5 gap-1 x15:block x15:p-0">
          {pieData.labels.map((label, index) => (
            <div key={index} className="legend-item whitespace-nowrap">
              <span
                className="legend-color w-2 h-2 inline-block mr-2"
                style={{
                  backgroundColor: pieData.datasets[0].backgroundColor[index],
                }}
              ></span>
              {label}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (type === "bar") {
    return (
      <>
        <ItemTitle type="bar" />
        <Bar
          data={barData}
          style={{ width: 100, height: 100 }}
          options={{ plugins: { legend: { display: false } } }}
        />
      </>
    );
  }

  if (type === "line") {
    return (
      <>
        <ItemTitle type="line" />
        <Line
          data={lineData}
          options={lineOptions}
          style={{ width: 100, height: 100 }}
        />
      </>
    );
  }

  if (type === "CircleProgress") {
    return (
      <>
        <ItemTitle type="CircleProgress" />
        <CircleProgress
          percent={75}
          size={150}
          strokeWidth={12}
          gradient={["#3b82f6", "#10b981"]}
          className="shadow-lg rounded-full"
          duration={500}
        />
      </>
    );
  }

  return null;
}
