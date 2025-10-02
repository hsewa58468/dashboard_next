"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { toPng } from "html-to-image";
import Canvas_1x1 from "@/components/dashboard_canvas_1x1";
import Canvas_1x2 from "@/components/dashboard_canvas_1x2";
import SideBar from "@/components/tools/sidebar";
import Edit_ToolBtn from "@/components/tools/edit_dropdown_switch";

import chartStore from "@/store/useChartStore";
import showStore from "@/store/useShowStore";

const DynamicMap = dynamic(() => import("@/components/custom_map"), {
  ssr: false,
});
const DynamicLightbox = dynamic(() => import("@/components/tools/lightbox"), {
  ssr: false,
});

interface State {
  "1x1": string[];
  "1x2": string[];
}

export default function Dashboard() {
  const [showEditBtn, setShowEditBtn] = useState(false);
  const { spaces, setRevertSpace } = chartStore();
  const {
    sideBarShow,
    setSideBarShow,
    lightBoxShow,
    printItemRef,
    setPrintItemRef,
    triggerSpace,
    setTriggerSpace,
    whichBtnClick,
    setWhichBtnClick,
  } = showStore();
  const [prevStore, setPrevStore] = useState<State>(spaces);
  const divRefs = useRef<Record<string, HTMLDivElement[]>>({});

  const setDivRef = (el: HTMLDivElement | null, space: string, idx: number) => {
    if (!divRefs.current[space]) {
      divRefs.current[space] = [];
    }

    if (el) {
      divRefs.current[space][idx] = el;
    } else {
      delete divRefs.current[space][idx];
    }
  };

  useEffect(() => {
    if (!triggerSpace.space) {
      return;
    }
    setPrintItemRef(divRefs.current[triggerSpace.space][triggerSpace.idx]);
  }, [triggerSpace]);

  // 處理圖片下載觸發
  useEffect(() => {
    if (whichBtnClick !== "download") return;
    // 檢查 ref 是否存在
    if (printItemRef?.current) {
      // 使用 html-to-image 的 toPng 方法
      toPng(printItemRef.current, { cacheBust: true })
        .then((dataUrl) => {
          // dataUrl 是一個 base64 格式的圖片字串
          const link = document.createElement("a");
          link.download = `${triggerSpace.name}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setWhichBtnClick("");
        });
    } else {
      console.log("找不到對應的 DOM 元素。請先選擇一個項目。");
    }
  }, [whichBtnClick]);

  // 啟動編輯時先儲存舊狀態
  useEffect(() => {
    if (showEditBtn) {
      setPrevStore(spaces);
    }
  }, [showEditBtn]);

  return (
    <main className="main_wrapper h-[calc(100vh-105px)] min-w-[1280px] grid grid-cols-6 grid-rows-3 gap-4 p-8 text-black">
      {spaces["1x1"].map((item, idx) => (
        <div
          ref={(el) => setDivRef(el, "1x1", idx)}
          key={idx}
          className="relative card-layout col-start-{1+idx%2} row-start-{1+Math.floor(idx/2)} bg-gray-200 "
        >
          <Edit_ToolBtn
            showEditBtn={showEditBtn}
            editEvent={() => {
              setTriggerSpace({ space: "1x1", idx, name: item });
            }}
          />
          <Canvas_1x1 type={item} />
        </div>
      ))}

      {/* 左下 1 個 1x2 區塊（橫跨 2 欄）*/}
      {spaces["1x2"].map((item, idx) => (
        <div
          ref={(el) => setDivRef(el, "1x2", idx)}
          key={idx}
          className="card-layout pt-[45px] col-start-1 col-span-2 row-start-3 bg-gray-200"
        >
          <Edit_ToolBtn
            showEditBtn={showEditBtn}
            editEvent={() => {
              setTriggerSpace({ space: "1x2", idx: idx, name: item });
            }}
          />
          <Canvas_1x2 type={item} />
        </div>
      ))}

      <div className="card-layout col-start-3 col-span-2 row-start-1 row-span-3 bg-blue-200">
        <DynamicMap />
      </div>
      <div className="card-layout col-start-5 col-span-2 row-start-1 row-span-3  bg-blue-200 ">
        2x3
      </div>

      {/* 編輯模式按鈕 */}
      <div className="absolute top-16 right-10 flex flex-row items-end gap-4 z-1">
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
          sideBarShow || lightBoxShow
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          sideBarShow && setSideBarShow(false);
        }}
      >
        <SideBar isOpen={sideBarShow} setIsOpen={setSideBarShow} />

        <DynamicLightbox />
      </div>
    </main>
  );
}
