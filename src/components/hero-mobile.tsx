"use client";
import React from "react";
import Paragraph from "../interfaces/paragrapgh";
import HeroHeading from "./headings/hero-heading";
import HotelSearchFormMobile from "./hero/hotel-search-form/hotel-search-form-mobile";
import { usePathname } from "next/navigation";

import FlightSearchFormMobile from "./hero/flight-search-form/flight-search-form-mobile";
import CarsSearchFormMobile from "./cars/cars-search-form/cars-search-form-mobile";
import AccessoriesSearchFormMobile from "./accessories/accessories-search-form/accessories-search-form-mobile";

const HeroMobile = () => {
  const currentPath = usePathname();

  return (
    <div className="mt-8 h-[800px] overflow-hidden sm:h-[730px] ">
      <div className="container mx-auto px-3 sm:px-5">
        <div>
          <HeroHeading text="Let’s Book your next trip!" />
          <div className="mt-3 text-[14px] text-sm font-semibold text-darkBlue sm:text-xl">
            <Paragraph text=" Choose best deals over 1.5 million travel services" />
          </div>
        </div>

        {/* Flight Search Form for Home or Flights Page */}
        {["/", "/flights"].includes(currentPath) && <FlightSearchFormMobile />}

        {/* Hotel Search Form on Hotels Page */}
        {currentPath == "/hotels" && <HotelSearchFormMobile />}
        {/* Cars Search Form on Cars Page */}
        {currentPath === "/cars" && <CarsSearchFormMobile />}

        {/* Accessories Search Form on Accessories Page */}
        {currentPath === "/accessories" && <AccessoriesSearchFormMobile />}
      </div>
    </div>
  );
};

export default HeroMobile;
