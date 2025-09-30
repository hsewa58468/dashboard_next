"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import Canvas_1x1 from "@/components/dashboard_canvas_1x1";
import Canvas_1x2 from "@/components/dashboard_canvas_1x1";

import showStore from "@/store/useShowStore";

interface ItemProps {
  title?: string;
  children?: React.ReactNode; // 可傳入客製化children
}

export default function LightBox({ title, children }: ItemProps) {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const {
    lightBoxShow,
    triggerName,
    whichBtnClick,
    chartHint,
    setLightBoxShow,
    setWhichBtnClick,
  } = showStore();
  const safeHtml = DOMPurify.sanitize(chartHint[triggerName] || "");

  function handleCloseBox() {
    setLightBoxShow(false);
    setTimeout(() => {
      setWhichBtnClick("");
    }, 300);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 點選空白區塊關閉選單
      if (
        lightboxRef.current &&
        !lightboxRef.current.contains(event.target as Node)
      ) {
        handleCloseBox();
      }
    }

    if (lightBoxShow) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lightBoxShow]);

  return (
    <div
      ref={lightboxRef}
      className={`lightbox fixed-center min-w-[300px]  bg-white rounded-lg z-50 animate-300 ${
        lightBoxShow ? "translate-x-0" : "translate-x-full opacity-0 invisible"
      } ${whichBtnClick === "magnifier" ? "w-3/5" : ""}`}
    >
      <div className="lightbox_header h-[50px] flex flex-row justify-between gap-4 border-b-1 border-blue-300 p-4">
        <div className="lightbox_title font-bold">
          {title
            ? title
            : whichBtnClick === "magnifier"
            ? "放大檢視"
            : whichBtnClick === "hint"
            ? "小幫手"
            : ""}
        </div>
        <button className="cursor-pointer" onClick={handleCloseBox}>
          <Image src="/icons/cross.svg" alt="" width={24} height={24} />
        </button>
      </div>
      <div className="lightbox_wrapper h-[calc(100%-50px)] flex flex-col gap-4 overflow-y-auto no-scrollbar p-4">
        <div
          className={`${
            whichBtnClick === "magnifier"
              ? "card-layout min-h-[300px] shadow-lg "
              : ""
          }`}
        >
          {whichBtnClick === "magnifier" && <Canvas_1x1 type={triggerName} />}
          {whichBtnClick === "hint" && (
            <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
