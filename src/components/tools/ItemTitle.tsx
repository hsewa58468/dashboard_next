import React from "react";
import Image from "next/image";

interface ItemProps {
  type?: string;
}

export default function ItemTitle({ type }: ItemProps) {
  return (
    <div className="absolute top-0 w-full h-[45px] flex items-center py-1 px-2 bg-gradient-to-br from-blue-300 to-gray-300">
      <Image src="/icons/deco.png" alt="裝飾圖示" width={18} height={18} />
      <span className="ml-1 text-lg font-semibold bold">
        {type === "pie" && "圓餅圖"}
        {type === "bar" && "長條圖"}
        {type === "line" && "折線圖"}
        {type === "CircleProgress" && "圓形進度條"}
        {type === "map" && "互動式地圖"}
      </span>
    </div>
  );
}
