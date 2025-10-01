import React from "react";
import Image from "next/image";

interface ItemProps {
  typeName?: string;
}

export default function ItemTitle({ typeName }: ItemProps) {
  return (
    <div className="absolute top-0 w-full h-[45px] flex items-center py-1 px-2 rounded-t text-white bg-gradient-to-br from-blue-300 to-gray-300">
      <Image src="/icons/deco.png" alt="裝飾圖示" width={18} height={18} />
      <span className="ml-1 max-w-[70%] text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis">
        {typeName}
      </span>
    </div>
  );
}
