"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import showStore from "@/store/useShowStore";

interface ItemProps {
  showEditBtn: boolean;
  editEvent: () => void;
}

interface DropProps {
  setDropOpen: (isOpen: boolean) => void;
}

function Dropdown({ setDropOpen }: DropProps) {
  const { setLightBoxShow, setWhichBtnClick } = showStore();
  function handleClick(clickBtn: string) {
    setWhichBtnClick(clickBtn);
    setDropOpen(false);
    if (clickBtn !== "download") {
      setLightBoxShow(true);
    }
  }

  return (
    <ul className="py-1 px-2 divide-y divide-blue-300 divide-dotted">
      <li>
        <button
          className="my-1 flex gap-1 cursor-pointer w-max"
          onClick={() => {
            handleClick("magnifier");
          }}
        >
          <Image src="/icons/magnifier.svg" alt="" width={14} height={14} />
          放大檢視
        </button>
      </li>
      <li>
        <button
          className="my-1 flex gap-1 cursor-pointer w-max"
          onClick={() => {
            handleClick("hint");
          }}
        >
          <Image
            src="/icons/question.svg"
            alt=""
            className="ml-0.5"
            width={12}
            height={12}
          />
          小幫手
        </button>
      </li>
      <li>
        <button
          className="my-1 flex gap-1 cursor-pointer w-max"
          onClick={() => {
            handleClick("download");
          }}
        >
          <Image src="/icons/download.svg" alt="" width={14} height={14} />
          圖片下載
        </button>
      </li>
    </ul>
  );
}

export default function Edit_ToolBtn({ showEditBtn, editEvent }: ItemProps) {
  const [dropOpen, setDropOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSideBarShow } = showStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropOpen(false);
      }
    }

    // 增加事件監聽器
    document.addEventListener("mousedown", handleClickOutside);

    // 清除函式：在元件卸載時移除事件監聽器
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // 依賴於 ref，確保正確引用

  return showEditBtn ? (
    <button
      className="space-switch-btn"
      onClick={() => {
        setSideBarShow(true);
        editEvent();
      }}
    >
      <Image src="/icons/change.png" alt="" width={24} height={24} />
    </button>
  ) : (
    <>
      <div ref={dropdownRef} className="burgerWrap">
        <button
          className="space-switch-btn"
          onClick={() => {
            editEvent && editEvent();
            setDropOpen(!dropOpen);
          }}
        >
          <Image
            src="/icons/burger.svg"
            className="invert-white"
            alt=""
            width={24}
            height={24}
          />
        </button>
        <div className="absolute top-[45px] left-4/5 w-auto text-xs bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {dropOpen && <Dropdown setDropOpen={setDropOpen} />}
        </div>
      </div>
    </>
  );
}
