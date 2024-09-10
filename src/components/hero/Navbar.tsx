'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ImageTextBasicComponent from "./ImageTextBasicComponent";

const Navbar = () => {
  const [active, setActive] = useState("Flights");

  const menuItems = [
    {
      name: "Flights",
      path: "/flights",
      icon: "/assets/icons/plane-icon-white.svg",
      activeIcon: "/assets/icons/plane-icon.svg",
    },
    {
      name: "Hotels",
      path: "/hotels",
      icon: "/assets/icons/hotel-icon.svg",
      activeIcon: "/assets/icons/hotel-icon-blue.svg",
    },
    {
      name: "Cars",
      path: "/cars",
      icon: "/assets/icons/car-icon.svg",
      activeIcon: "/assets/icons/car-icon-blue.svg",
    },
    {
      name: "Accessories",
      path: "/accessories",
      icon: "/assets/icons/accessories-icon.svg",
      activeIcon: "/assets/icons/accessories-icon-blue.svg",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath === "/") {
        setActive("Flights"); // Set "Flights" active if the current path is homepage
      } else {
        const currentItem = menuItems.find((item) => item.path === currentPath);
        if (currentItem) {
          setActive(currentItem.name);
        }
      }
    }
  }, []);



  return (
    <div className="bg-[#10294D] inline-flex py-[13px] px-3 rounded-[10px] text-[20px] font-[600]">
      <div className="flex space-x-[3.3rem]">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`px-3 py-2 rounded-[10px] cursor-pointer ${active === item.name ? "bg-white text-[#10294D]" : "text-white"}`}
            onClick={() => setActive(item.name)}
          >
            <Link href={item.path}>
              <ImageTextBasicComponent
                img={active === item.name ? item.activeIcon : item.icon}
                width={18}
                height={18}
                gap={2}
                text={item.name}
                font={600}
              />
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Navbar;
