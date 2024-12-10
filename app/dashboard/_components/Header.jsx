"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const path = usePathname();
  useEffect(() => {});
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <div className="flex gap-2">
        <Image src={"/logo.svg"} width={70} height={50} alt="logo" />
        <p className="font-bold text-xl"> PrepAI</p>
      </div>

      <ul className="hidden md:flex gap-6">
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path == "/dashboard" && "text-primary font-bold"}
        `}
          >
            Dashboard
          </li>
        </Link>
        <Link href={"/dashboard/questions"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
        ${path == "/dashboard/questions" && "text-primary font-bold"}
        `}
          >
            Questions
          </li>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
        ${path == "/dashboard/upgrade" && "text-primary font-bold"}
        `}
          >
            Upgrade
          </li>
        </Link>
        <Link href={"/dashboard/how"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
        ${path == "/dashboard/how" && "text-primary font-bold"}
        `}
          >
            How it Works?
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
