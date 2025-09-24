"use client";
import Canvas_1x1 from "@/components/dashboard_canvas_1x1";
import Canvas_1x2 from "@/components/dashboard_canvas_1x2";
import MapComponent from "@/components/custom_map";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/custom_map"), {
  ssr: false, // 關鍵設定，關閉伺服器端渲染
});
import { useState } from "react";

export default function Dashboard() {
  const chartTypes = ["pie", "bar", "line", "CircleProgress"];
  const [choosedType, setChoosedType] = useState([
    { type: "pie", editing: false },
    { type: "bar", editing: false },
    { type: "line", editing: false },
    { type: "CircleProgress", editing: false },
  ]);

  const handleEditClick = (idx: number) => {
    setChoosedType((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, editing: !item.editing } : item
      )
    );
  };

  const handleTypeChange = (idx: number, newType: string) => {
    setChoosedType((prev) =>
      prev.map((item, i) =>
        i === idx ? { type: newType, editing: false } : item
      )
    );
  };

  return (
    <main className="main_wrapper grid grid-cols-6 grid-rows-3 gap-4 p-8">
      {/* 左上四個 1x1 區塊分別放三種互動圖表 */}
      {choosedType.map((item, idx) => (
        <div
          key={idx}
          className="relative flex flex-col items-center justify-center col-start-{1+idx%2} row-start-{1+Math.floor(idx/2)} bg-gray-200 overflow-hidden rounded-lg x15:flex-row "
        >
          <div className="absolute top-2.5 right-2 flex flex-col items-end gap-1 z-1">
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
              onClick={() => handleEditClick(idx)}
            >
              編輯
            </button>
            {item.editing && (
              <select
                className="ml-2 px-2 py-1 rounded border"
                value={item.type}
                onChange={(e) => handleTypeChange(idx, e.target.value)}
              >
                {chartTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
            )}
          </div>
          <Canvas_1x1 type={item.type} />
        </div>
      ))}

      {/* 左下 1 個 1x2 區塊（橫跨 2 欄）*/}
      <div className="relative col-start-1 col-span-2 row-start-3 flex flex-row items-center justify-center bg-gray-200 overflow-hidden rounded-lg">
        <Canvas_1x2 type="pie" />
      </div>

      <div className="relative col-start-3 col-span-2 row-start-1 row-span-3 bg-blue-200 rounded-lg overflow-hidden">
        <DynamicMap />
      </div>
      <div className="relative col-start-5 col-span-2 row-start-1 row-span-3 flex items-center justify-center bg-blue-200 rounded-lg overflow-hidden">
        2x3
      </div>

      {/* 其他區塊可依需求補充 */}
    </main>
  );
}
