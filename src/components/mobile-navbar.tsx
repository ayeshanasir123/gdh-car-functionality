"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MobileNavbar = () => {
  const [activeNav, setActiveNav] = useState("Flights"); // Changed to "Flights" as default

  const navItems = [
    { name: "Flights", href: "/flights", icon: "/assets/icons/flights.svg" },
    { name: "Hotels", href: "/hotels", icon: "/assets/icons/hotels.svg" },
    { name: "Cars", href: "/cars", icon: "/assets/icons/cars.svg" },
    {
      name: "Accessories",
      href: "/accessories",
      icon: "/assets/icons/accessories.svg",
    },
  ];
  return (
    <div className="mx-auto max-w-screen-lg">
      {/* This sets the max-width and centers the Navbar */}
      <div className="mt-8 px-2 py-2">
        <ul className="flex justify-around gap-2">
          {navItems.map((item) => (
            <li key={item.name} onClick={() => setActiveNav(item.name)}>
              <Link
                href={item.href}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="sm:h-20 sm:w-20"
                />
                <p
                  className={`pt-1 text-center text-[12px] font-bold ${activeNav === item.name ? "text-[#0071BC]" : "text-[#7BA2E9]"}`}
                >
                  {item.name}
                </p>
                {activeNav === item.name && (
                  <div className=" mt-2 w-full border-b-2 border-[#0071BC]"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
