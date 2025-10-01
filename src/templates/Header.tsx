import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Dashboard" }) => (
  <header className="shadow">
    <nav className="bg-blue-300 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex text-white text-xl font-bold gap-2">
          <Image src="/icons/deco.png" alt="" width={24} height={24} />
          Next 公版
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-white hover:text-blue-100">
            首頁
          </Link>
          <Link href="/dashboard" className="text-white hover:text-blue-100">
            儀表板
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
