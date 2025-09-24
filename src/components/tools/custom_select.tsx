import React, { useEffect, useState } from "react";

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

  const handleSelect = (name: string) => {
    setSelectedValue(name);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  return (
    <div className="relative w-48">
      {/* 這是自訂的顯示介面 */}

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
        className={`absolute top-full w-full mt-2 bg-white rounded-lg shadow-md transition-all duration-200 z-10 ${
          isOpen ? "block" : "hidden"
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
