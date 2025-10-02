import React from "react";
import Image from "next/image";

interface HeaderProps {
  title?: string;
}

const Footer: React.FC<HeaderProps> = ({ title = "Dashboard" }) => (
  <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    {title}
  </footer>
);

export default Footer;
