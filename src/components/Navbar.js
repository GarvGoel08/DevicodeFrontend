import React from "react";

export default function Navbar() {
  return (
    <div className="flex relative z-10 justify-between bg-main-bg items-center py-2 px-6">
      <img
        src="./Images/Devicode-Logo.png"
        className="h-[40px] "
        alt="Devicode Logo"
      />
      <div className="flex gap-3 py-2">
        <button className="border lg:text-base text-sm hover:bg-theme-color-primary transition-all duration-300 ease-in-out border-theme-color-primary text-text-normal py-1 px-6 w-max rounded-md">
          Sign Up
        </button>
        <button className="hover:bg-theme-color-primary lg:text-base text-sm transition-all duration-300 ease-in-out bg-theme-color-secondary text-text-normal py-[8px] px-6 w-max rounded-md">
          Login
        </button>
      </div>
    </div>
  );
}
