import React from "react";
import Image from "next/image";
import Canvas_1x1 from "@/components/dashboard_canvas_1x1";
import Canvas_1x2 from "@/components/dashboard_canvas_1x1";

import chartStore from "@/store/useChartStore";

interface ItemProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  layout: string;
  position: number;
}

export default function SideBar({
  isOpen,
  setIsOpen,
  layout,
  position,
}: ItemProps) {
  const dashnoardStore = chartStore();
  const { allChartTypes, setChoosedType } = dashnoardStore;

  return (
    <div
      className={`sideBar fixed top-0 right-0 h-screen w-100 bg-white rounded-l-lg z-50 animate-300 ${
        isOpen ? "translate-x-0" : "translate-x-full opacity-0 invisible"
      }`}
    >
      <div className="sideBar_header h-[50px] flex flex-row justify-between gap-4 border-b-1 border-blue-300 p-4 mx-2">
        <div className="sideBar_title">抽換內容</div>
        <button
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Image src="/icons/cross.svg" alt="" width={24} height={24} />
        </button>
      </div>
      <div className="sideBar_wrapper h-[calc(100%-50px)] flex flex-col gap-4 overflow-y-auto no-scrollbar p-4">
        {layout === "1x1" &&
          allChartTypes[layout]?.map((type, index) => (
            <button
              key={index}
              className="sideBar_item cursor-pointer"
              onClick={() => {
                setChoosedType("1x1", position, type);
              }}
            >
              <div className="card-layout min-h-[300px] shadow-lg pointer-events-none">
                <Canvas_1x1 type={type} />
              </div>
            </button>
          ))}
        {layout === "1x2" &&
          allChartTypes[layout]?.map((type, index) => (
            <button
              key={index}
              className="sideBar_item cursor-pointer"
              onClick={() => {
                setChoosedType("1x1", 0, type);
              }}
            >
              <div className="card-layout min-h-[300px] shadow-lg pointer-events-none">
                <Canvas_1x2 type={type} />
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
