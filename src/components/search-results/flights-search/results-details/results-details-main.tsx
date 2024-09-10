import React from "react";

import { useSearchParams } from "next/navigation";
import { convertTo12HourFormat } from "@/utils/convertTo12HourFormat";

import { ISingleFlightDetails } from "@/interfaces/flights/ISingleFlightDetails";

import BaggageDetails from "./baggage-details";
import FlightPriceSummary from "./flight-price-summary";
import RecommendedProductDetails from "./recommended-product-details";
import RecommendedProductDetailsSlider from "./recommended-product-details-slider";

import SeatDetails from "./seat-details";
import SingleFlightDetails from "./single-flight-details";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { setSingleFlight } from "@/redux/features/flights/single-flight-details-slice";

const FlightsSearchResultsDetailsMain = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const data = searchParams.get("data")
    ? JSON.parse(searchParams.get("data") as string)
    : null;

  console.log("Single Flight Details Data: ", data?.legs[0]?.segment[0]);

  console.log("Flight Price Details: ", data?.price);

  const flightPriceDetails = {
    totalBaseFare: data?.price?.totalBaseFare,
    totalFare: data?.price?.totalFare,
    totalTaxes: data?.price?.totalTaxes,
  };

  const singleFlightDetailsData = data?.legs[0]?.segment[0];
  const departureTime = convertTo12HourFormat(
    singleFlightDetailsData?.departure?.departureDateTime
      .split("T")[1]
      .split("+")[0],
  );

  const arrivalTime = convertTo12HourFormat(
    singleFlightDetailsData?.arrival?.arrivalDateTime
      .split("T")[1]
      .split("+")[0],
  );

  dispatch(
    setSingleFlight({
      departureCityCode: singleFlightDetailsData?.departure?.code,
      departureTime: departureTime,
      arrivalCityCode: singleFlightDetailsData?.arrival?.code,
      arrivalTime: arrivalTime,
      duration: singleFlightDetailsData?.duration,
      stopCount: singleFlightDetailsData?.stopCount,
      flightClass: singleFlightDetailsData?.className,
      flightNumber: singleFlightDetailsData?.flightNumber,
    }),
  );

  const singleFlightDetails: ISingleFlightDetails = {
    departureCityCode: singleFlightDetailsData?.departure?.code,
    departureTime: departureTime,
    arrivalCityCode: singleFlightDetailsData?.arrival?.code,
    arrivalTime: arrivalTime,
    duration: singleFlightDetailsData?.duration,
    stopCount: singleFlightDetailsData?.stopCount,
    flightClass: singleFlightDetailsData?.className,
    flightNumber: singleFlightDetailsData?.flightNumber,
  };

  const seatsAvailable: number = singleFlightDetailsData?.seatsAvailable;

  if (singleFlightDetails.departureCityCode !== undefined) {
    return (
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className=" col-span-2">
            <div className="flex flex-col">
              <SingleFlightDetails singleFlightDetails={singleFlightDetails} />
              <SeatDetails seatsAvailable={seatsAvailable} />
              {/* <BaggageDetails /> */}
            </div>
          </div>
          <div className="flex flex-col">
            <FlightPriceSummary
              flightPriceDetails={flightPriceDetails}
              singleFlightDetails={singleFlightDetails}
            />
            <RecommendedProductDetails />
          </div>
        </div>
        <RecommendedProductDetailsSlider deviceType="desktop" />
      </section>
    );
  } else {
    return (
      <h2 className="text-[1.5rem]">
        Data has expired! Please visit{" "}
        <Link href="/" className="text-bold underline">
          Home
        </Link>{" "}
        page to search for flights.
      </h2>
    );
  }
};

export default FlightsSearchResultsDetailsMain;
