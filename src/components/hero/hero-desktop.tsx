"use client";
import UniqueSellingPoint from "./UniqueSellingPoint";
import { usePathname } from "next/navigation";
import HeroHeading from "../headings/hero-heading";
import FlightSearchFormDesktop from "./flight-search-form/flight-search-form-desktop";
import Navbar from "./Navbar";
import CarsSearchFormDesktop from "../cars/cars-search-form/cars-search-form-desktop";
import AccessoriesSearchFormDesktop from "../accessories/accessories-search-form/accessories-search-form-desktop";
import HotelSearchFormDesktop from "./hotel-search-form/hotel-search-form-desktop";

const HeroDesktop = () => {
  const currentPath = usePathname();
  return (
    <div className="mx-auto max-w-screen-2xl">
      <UniqueSellingPoint />

      <div>
        <div className=" heroImage rounded-[8px] bg-cover bg-center">
          <div className="mx-[5rem] pb-[8rem] pt-[5rem]">
            <div className="text-white">
              <HeroHeading text="Let’s Book your next trip!" />
              <p className="text-[32px] font-[500]">
                Choose best deals over 1.5 million travel services
              </p>
            </div>

            <div className="mt-5">
              <Navbar />
            </div>
            <div className="mt-4">
              {/* Flight Search Form for Home or Flights Page */}
              {["/", "/flights"].includes(currentPath) && (
                <FlightSearchFormDesktop />
              )}

              {/* Hotel Search Form for Hotels Page */}
              {currentPath == "/hotels" && <HotelSearchFormDesktop />}

              {/* Cars Search Form on Cars Page */}
              {currentPath === "/cars" && <CarsSearchFormDesktop />}

              {/* Accessories Search Form on Accessories Page */}
              {currentPath === "/accessories" && (
                <AccessoriesSearchFormDesktop />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDesktop;
