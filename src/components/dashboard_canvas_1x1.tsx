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
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import CircleProgress from '@/components/custom_progress_chart';

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartDataLabels
);

const pieData = {
  labels: ["蘋果", "香蕉", "葡萄", "蘋果", "香蕉", "蘋果", "香蕉"],
  datasets: [
    {
      data: [20, 15, 1, 15, 1, 15, 1],
      backgroundColor: [
        "#3b82f6",
        "#ef4444",
        "#22c55e",
        "#ef4444",
        "#22c55e",
        "#ef4444",
        "#22c55e",
      ],
      borderWidth: 1,
    },
  ],
};

const pieOptions = {
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 40
    }
  },

  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      anchor: "end" as const,
      align: "end" as const,
      offset: 5,
      color: "#000",
      font: {
        weight: "bold" as const,
        size: 12,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (value: number, context: { chart: { data: { datasets: { data: any; }[]; }; }; }) => {
        const dataArr = context.chart.data.datasets[0].data;
        const total = dataArr.reduce((a: number, b: number) => a + b, 0);
        const percent = ((value / total) * 100).toFixed(1) + "%";
        return percent;
      },
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
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#ef4444",
    },
  ],
};

const lineOptions = {
  plugins: {
    datalabels: {
      display: false,
      anchor: "start" as const, // 標籤錨點（通常用 'end' 或 'start'）
      align: "start" as const, // 標籤對齊方式（'end' 會在點上方）
      color: "#33333346",
      font: {
        weight: "bold" as const,
        size: 12,
      },
    },
  },
};

export default function Canvas_1x1({ type }: { type: string }) {


  if (type === "pie") {
    return (
      <>
        <Pie
          className="pie_custom"
          data={pieData}
          options={pieOptions}
          style={{ width: 175, height: 175 }}
        />
        <div className="legend-container scrollbar-custom max-h-[90px] overflow-y-auto flex flex-row flex-wrap mx-auto pl-5 gap-1 x12:block x12:p-0">
          {pieData.labels.map((label, index) => (
            <div key={index} className="legend-item whitespace-nowrap">
              <span
                className="legend-color w-2 h-2 inline-block mr-2"
                style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
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
      <Bar
        data={barData}
        style={{ width: 100, height: 100 }}
        options={{ plugins: { legend: { display: false } } }}
      />
    );
  }
  if (type === "line") {
    return (
      <Line
        data={lineData}
        options={lineOptions}
        style={{ width: 100, height: 100 }}
      />
    );
  }
  if (type === "CircleProgress") {
    return (
      <CircleProgress
        percent={75}
        size={150}
        strokeWidth={12}
        gradient={['#3b82f6', '#10b981']}
        className="shadow-lg rounded-full"
        duration={500}
      />
    );
  }

  return null;
}
