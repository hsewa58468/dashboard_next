"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Canvas_1x1 from "@/components/dashboard_canvas_1x1";
import Canvas_1x2 from "@/components/dashboard_canvas_1x2";
import SideBar from "@/components/tools/sidebar";
import useStore from "@/store/useShowStore";
const DynamicMap = dynamic(() => import("@/components/custom_map"), {
  ssr: false,
});

interface State {
  "1x1": string[];
  "1x2": string[];
}

export default function Dashboard() {
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState({ name: "", idx: 0 });
  const dashnoardStore = useStore();
  const { allChartTypes, spaces, setRevertSpace } = dashnoardStore;
  const [prevStore, setPrevStore] = useState<State>(spaces);

  // 啟動編輯時先儲存舊狀態
  useEffect(() => {
    if (showEditBtn) {
      setPrevStore(spaces);
    }
  }, [showEditBtn]);

  return (
    <main className="main_wrapper h-[calc(100vh-95px)] grid grid-cols-6 grid-rows-3 gap-4 p-8">
      {spaces["1x1"].map((item, idx) => (
        <div
          key={idx}
          className="card-layout col-start-{1+idx%2} row-start-{1+Math.floor(idx/2)} bg-gray-200 "
        >
          {showEditBtn && (
            <button
              className="space-switch-btn"
              onClick={() => {
                setEditingSpace({ name: "1x1", idx });
                setSideBarOpen(true);
              }}
            >
              <Image src="/icons/change.png" alt="" width={24} height={24} />
            </button>
          )}
          <Canvas_1x1 type={item} />
        </div>
      ))}

      {/* 左下 1 個 1x2 區塊（橫跨 2 欄）*/}
      <div className="card-layout pt-[45px] col-start-1 col-span-2 row-start-3 bg-gray-200">
        {showEditBtn && (
          <button
            className="space-switch-btn"
            onClick={() => {
              setEditingSpace({ name: "1x2", idx: 0 });
              setSideBarOpen(true);
            }}
          >
            <Image src="/icons/change.png" alt="" width={24} height={24} />
          </button>
        )}
        <Canvas_1x2 type="pie" />
      </div>

      <div className="card-layout col-start-3 col-span-2 row-start-1 row-span-3 bg-blue-200">
        <DynamicMap />
      </div>
      <div className="card-layout col-start-5 col-span-2 row-start-1 row-span-3  bg-blue-200 ">
        2x3
      </div>

      {/* 編輯模式按鈕 */}
      <div className="absolute top-6 right-10 flex flex-row items-end gap-4 z-1">
        {showEditBtn && (
          <button
            className="px-2 py-1 bg-white text-blue-500 rounded text-xs cursor-pointer"
            onClick={() => {
              setShowEditBtn(!showEditBtn);
              setRevertSpace(prevStore);
            }}
          >
            取消
          </button>
        )}
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs cursor-pointer"
          onClick={() => {
            setShowEditBtn(!showEditBtn);
          }}
        >
          {showEditBtn ? "儲存" : "編輯"}
        </button>
      </div>
      <div
        className={`overlay-container fixed top-0 left-0 w-full h-screen bg-[#00000073] animate-300 z-10 ${
          sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setSideBarOpen(false);
        }}
      >
        <SideBar
          isOpen={sideBarOpen}
          setIsOpen={setSideBarOpen}
          layout={editingSpace.name}
          position={editingSpace.idx}
          chartTypes={allChartTypes}
        />
      </div>
    </main>
  );
}
