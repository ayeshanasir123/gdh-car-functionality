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

const DesktopHeader = () => {
  const [openNav, setOpenNav] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem>("flights");
  const path = usePathname();

  const toggleNavbar = () => {
    setOpenNav(!openNav);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    setActiveItem(item);
    toggleNavbar();
  };

  const isPaymentPage =
    path === "/flights/search-results/flights-search-payment-details";

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex justify-between pb-5">
        <div
          className={`flex justify-${isPaymentPage ? "center" : "between"} w-full`}
        >
          <Link href="/">
            <Image
              src={"/assets/images/gdf-logo.svg"}
              alt="Getdirectholidays Logo"
              width={300}
              height={46}
              className="h-[46px] w-[300px]"
            />
          </Link>

          {!isPaymentPage && (
            <ul className="flex items-center">
              {/* Contact */}
              <li className="mr-8">
                <Image
                  src="/assets/icons/header/contact-icon.svg"
                  alt="Contact Icon"
                  width={24}
                  height={24}
                />
              </li>

              {/* Help  */}
              <li className="mr-8 font-semibold">Help</li>

              {/* Choose Store */}
              <li className="mr-8">
                <Dialog>
                  <DialogTrigger>
                    <div className="flex items-center rounded-full border px-4 py-2">
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
                          <SelectValue placeholder="Stores" />
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
                          <SelectItem value="poland-store">
                            Poland Store
                          </SelectItem>
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
                      </Select>
                    </div>
                    {/* Choose Currency */}
                    <div className="my-1">
                      <h4 className="my-2 font-semibold">Choose Currency</h4>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="GBP" />
                        </SelectTrigger>
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
              </li>

              {/* Hamburger Menu */}
              <li onClick={toggleNavbar} className="cursor-pointer">
                <Image
                  src={"/assets/icons/hamburger-menu-icon.svg"}
                  alt="Hamburger Menu Icon"
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px]"
                />
              </li>
            </ul>
          )}
        </div>
      </div>
      {openNav && (
        <div className="absolute right-7 top-[76px] z-20 h-[400px] w-[290px] overflow-y-auto rounded-lg border bg-white p-6 shadow-lg">
          <ul className="mt-4 flex flex-col items-start space-y-5 text-[15px] font-semibold text-inActive">
            <li
              className={`cursor-pointer ${
                activeItem === "flights" ? "text-darkBlue" : "text-inActive"
              }`}
              onClick={() => handleMenuItemClick("flights")}
            >
              <Link href="/flights">Flights</Link>
            </li>
            <li
              className={`cursor-pointer ${
                activeItem === "hotels" ? "text-darkBlue" : "text-inActive"
              }`}
              onClick={() => handleMenuItemClick("hotels")}
            >
              <Link href="/hotels">Hotels</Link>
            </li>
            <li
              className={`cursor-pointer ${
                activeItem === "cars" ? "text-darkBlue" : "text-inActive"
              }`}
              onClick={() => handleMenuItemClick("cars")}
            >
              <Link href="/cars">Cars</Link>
            </li>
            <li
              className={`w-full cursor-pointer border-b border-border pb-3 ${
                activeItem === "accessories" ? "text-darkBlue" : "text-inActive"
              }`}
              onClick={() => handleMenuItemClick("accessories")}
            >
              <Link href="/accessories">Accessories</Link>
            </li>
            <li
              className={`cursor-pointer ${
                activeItem === "help" ? "text-darkBlue" : "text-inActive"
              }`}
              onClick={() => handleMenuItemClick("help")}
            >
              <Link href="#">Help</Link>
            </li>
            <li
              className={`w-full cursor-pointer border-b border-border pb-3 ${
                activeItem === "contact" ? "text-darkBlue" : "text-inActive"
              }`}
              onClick={() => handleMenuItemClick("contact")}
            >
              <Link href="#">Contact</Link>
            </li>
          </ul>
          <div className="flex w-full flex-col items-start space-y-4 pt-6">
            <button className="w-full rounded-md bg-darkBlue py-2 text-[12px] font-bold text-white">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopHeader;
