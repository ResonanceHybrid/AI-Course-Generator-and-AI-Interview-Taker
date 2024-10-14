import React from "react";
import SideBar from "./_components/SideBar";
import Header from "../Mock/_components/Header";

function CGLayout({ children }) {
  return (
    <div className="h-screen ">
      <Header />
      <div className="flex">
        <div className="md:w-64 hidden md:block fixed h-full">
          <SideBar />
        </div>
        <div className="flex-1 md:ml-64 overflow-y-auto p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CGLayout;
