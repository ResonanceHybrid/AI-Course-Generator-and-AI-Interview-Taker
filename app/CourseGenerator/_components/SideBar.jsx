"use client";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineHome, HiOutlineLightBulb, HiOutlinePower } from "react-icons/hi2";

function SideBar() {
  const Menu = [
    { id: 1, name: "Home", icon: <HiOutlineHome />, path: "/CourseGenerator" },
    { id: 2, name: "Explore", icon: <HiOutlineLightBulb />, path: "" },
    { id: 3, name: "Logout", icon: <HiOutlinePower />, path: "" },
  ];

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md bg-white flex flex-col justify-between">
      {/* Sidebar Menu */}
      <ul className="space-y-4 overflow-auto">
        {Menu.map((item) => (
          <Link href={item.path} key={item.id} aria-label={item.name}>
            <div
              className={`ml-5 mt-2 flex items-center gap-3 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg transition-colors duration-300 ${
                item.path === path ? "bg-gray-100 text-black" : ""
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2 className="text-lg">{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>

      {/* Progress Section */}
      <div className="mb-20 w-[80%] mx-auto">
        <Progress value={33} />
        <h2 className="text-sm my-2">3 out of 5 Courses generated</h2>
        <p className="text-xs text-gray-500">
          Upgrade Plan For Unlimited Course Generation
        </p>
      </div>
    </div>
  );
}

export default SideBar;
