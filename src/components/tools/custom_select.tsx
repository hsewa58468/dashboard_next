import React, { useEffect, useState, useRef } from "react";

interface Location {
  name: string;
}

interface CustomSelectProps {
  items: Location[];
  setSelectedFunction?: (value: number) => void;
}

export default function CustomSelect({
  items,
  setSelectedFunction,
}: CustomSelectProps) {
  const [selectedValue, setSelectedValue] = useState(items[0].name);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null); // 創建一個 ref

  const handleSelect = (name: string) => {
    setSelectedValue(name);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 如果點擊的目標不在選單容器內，就關閉選單
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // 當選單打開時，添加事件監聽器
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 在元件卸載或選單關閉時，移除事件監聽器
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // 只有在 isOpen 狀態改變時才重新運行

  return (
    <div ref={selectRef} className="relative w-48">
      {/* 客製化外框 */}
      <button
        className="relative flex items-center justify-between p-2.5 w-full bg-white rounded-lg shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 客製化選項 */}
      <div
        className={`absolute top-full w-full mt-2 bg-white rounded-lg shadow-md transition-all duration-300 z-10 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {items.map((loc, index) => (
          <div
            key={loc.name}
            onClick={() => {
              setSelectedFunction && setSelectedFunction(index);
              handleSelect(loc.name);
            }}
            className="p-3 cursor-pointer hover:bg-gray-100"
          >
            {loc.name}
          </div>
        ))}
      </div>

      {/* 這是隱藏的原生 select */}
      <select
        onChange={(e) => setSelectedValue(e.target.value)}
        className="hidden"
      >
        {items.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
