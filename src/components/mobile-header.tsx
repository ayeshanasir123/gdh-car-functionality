"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

type MenuItem =
  | "flights"
  | "hotels"
  | "cars"
  | "accessories"
  | "help"
  | "contact";

const MobileHeader = () => {
  const [openNav, setOpenNav] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem>("flights");
  const [lastClickedItem, setLastClickedItem] = useState<MenuItem>("flights");
  const path = usePathname();

  const toggleNavbar = () => {
    setOpenNav(!openNav);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    setActiveItem(item);
    setLastClickedItem(item);
    toggleNavbar();
  };

  const handleLogoClick = () => {
    setActiveItem("flights");
    setLastClickedItem("flights");
    if (openNav) {
      toggleNavbar();
    }
  };

  const isPaymentPage =
    path ===
    "/flights/search-results/results-details/passenger-details/payment-details";

  return (
    <div className="container relative mx-auto max-w-[1200px] border-[#EEEEEE] px-3 py-5 sm:px-6 sm:py-5 md:px-8 lg:px-10">
      <div
        className={`flex justify-${isPaymentPage ? "center" : "between"} w-full`}
      >
        <Link href="/">
          <div onClick={handleLogoClick}>
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={180}
              height={24}
              className="h-[24px] w-[180px] sm:h-[32px] sm:w-[240px] md:h-[40px] md:w-[300px] lg:h-[40px] lg:w-[300px]"
            />
          </div>
        </Link>
        {!isPaymentPage && (
          <div onClick={toggleNavbar} className="cursor-pointer">
            <Image
              src={
                openNav
                  ? "/assets/icons/cross.svg"
                  : "/assets/icons/hamburger.svg"
              }
              alt={`${openNav ? "menu" : "hamburger"}`}
              width={openNav ? 16 : 24}
              height={openNav ? 16 : 24}
              className={`${
                openNav
                  ? "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                  : "h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 "
              }`}
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Page */}
      {openNav && (
        <div className="fixed left-0 right-0 top-[70px] z-20 overflow-y-auto bg-white p-4 px-6 sm:top-[77px] sm:px-8 md:top-[86px] md:px-12 lg:top-[86px] lg:px-12">
          <ul className="mt-4 flex flex-col items-start space-y-6 text-[18px] font-normal text-inActive sm:text-[20px] md:text-[22px] lg:text-[22px]">
            {/* Main Pages Links */}
            <div className="w-full cursor-pointer border-b border-border pb-3">
              <Link
                href="/flights"
                onClick={() => handleMenuItemClick("flights")}
              >
                <li
                  className={`mb-6 ${activeItem === "flights" ? "text-darkBlue" : "text-inActive"}`}
                >
                  Flights
                </li>
              </Link>
              <Link
                href="/hotels"
                onClick={() => handleMenuItemClick("hotels")}
              >
                <li
                  className={`mb-6 ${activeItem === "hotels" ? "text-darkBlue" : "text-inActive"}`}
                >
                  Hotels
                </li>
              </Link>
              <Link href="/cars" onClick={() => handleMenuItemClick("cars")}>
                <li
                  className={`mb-6 ${activeItem === "cars" ? "text-darkBlue" : "text-inActive"}`}
                >
                  Cars
                </li>
              </Link>
              <Link
                href="/accessories"
                onClick={() => handleMenuItemClick("accessories")}
              >
                <li
                  className={`mb-6 ${activeItem === "accessories" ? "text-darkBlue" : "text-inActive"}`}
                >
                  Accessories
                </li>
              </Link>
            </div>

            {/* Extra Pages Links */}
            <div className="w-full cursor-pointer border-b border-border pb-3">
              <Link href="#" onClick={() => handleMenuItemClick("help")}>
                <li
                  className={`mb-6 ${activeItem === "help" ? "text-darkBlue" : "text-inActive"}`}
                >
                  Help
                </li>
              </Link>
              <Link href="#" onClick={() => handleMenuItemClick("contact")}>
                <li
                  className={`mb-6 ${activeItem === "contact" ? "text-darkBlue" : "text-inActive"}`}
                >
                  Contact
                </li>
              </Link>
            </div>
          </ul>

          {/* Regional Settings */}
          <div className="my-4">
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center rounded-md border p-2">
                  <span className="mr-2 font-semibold">Regional Settings</span>
                  {/* Lanugage Icon */}
                  <Image
                    src="/assets/images/footer-section-images/uk.png"
                    alt="Language Icon"
                    width={24}
                    height={24}
                    className="h-[24px] w-[24px]"
                  />
                  <Image
                    src="/assets/icons/drop-down-icon.svg"
                    alt="Language Icon"
                    width={12}
                    height={12}
                    className="ml-2 h-[12px] w-[12px]"
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Regional Settings</DialogTitle>
                </DialogHeader>
                {/* Choose Store */}
                <div className="my-1">
                  <h4 className="my-2 font-semibold">Choose Store</h4>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Multi Stores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk-store">UK Store</SelectItem>
                      <SelectItem value="us-store">US Store</SelectItem>
                      <SelectItem value="germany-store">
                        Germany Store
                      </SelectItem>
                      <SelectItem value="netherlands-store">
                        Netherlands Store
                      </SelectItem>
                      <SelectItem value="pakistan-store">
                        Pakistan Store
                      </SelectItem>
                      <SelectItem value="poland-store">Poland Store</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Choose Language */}
                <div className="my-1">
                  <h4 className="my-2 font-semibold">Choose Language</h4>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="English" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk-store">English</SelectItem>
                      <SelectItem value="us-store">German</SelectItem>
                      <SelectItem value="germany-store">Urdu</SelectItem>
                      <SelectItem value="netherlands-store">Dutch</SelectItem>
                      <SelectItem value="pakistan-store">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Choose Currency */}
                <div className="my-1">
                  <h4 className="my-2 font-semibold">Choose Currency</h4>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="GBP" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk-store">US Dollar</SelectItem>
                      <SelectItem value="us-store">GBP</SelectItem>
                      <SelectItem value="germany-store">Euro</SelectItem>
                      <SelectItem value="netherlands-store">PKR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Save Button */}

                <Button onClick={() => {}} className="mt-4">
                  Save
                </Button>
                <Button variant="outline" onClick={() => {}}>
                  Cancel
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex w-full flex-col items-start space-y-4 pt-6 sm:space-y-6 sm:pt-8">
            <button className="w-full rounded-lg border border-lightBlue py-2 font-bold text-lightBlue">
              English (EN) United States $
            </button>
            <button className="w-full rounded-lg bg-lightBlue py-2 font-bold text-white">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
