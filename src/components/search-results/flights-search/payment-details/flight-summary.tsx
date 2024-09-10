"use client";
import React from "react";
import Image from "next/image";
import DetailsTitle from "../results-details/results-details-card/details-title";
import { useSearchParams } from "next/navigation";
import { ISingleFlightDetails } from "@/interfaces/flights/ISingleFlightDetails";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const FlightSummary = () => {
  const searchParams = useSearchParams();
  const flightSearchFormState = useAppSelector(
    (state: RootState) => state.flight,
  );

  const singleFlightDetails = useAppSelector(
    (state: RootState) => state.singleFlightDetails,
  );

  const data = searchParams.get("data")
    ? JSON.parse(searchParams.get("data") as string)
    : null;

  console.log("Data on flight summary : ", data);

  if (singleFlightDetails?.prices.totalBaseFare !== "") {
    return (
      <div className="p-4">
        <div className="flex items-center">
          <Image
            src="/assets/icons/plane-icon.svg"
            alt="landingIcon"
            width={20}
            height={20}
            className="mr-2 h-[20px] w-[20px]"
          />
          <DetailsTitle text="Flight Summary" />
        </div>

        <div className="mb-2 mt-4 flex flex-wrap justify-between font-semibold text-lightBlue">
          <div className="flex">
            <h3 className="ml-2 text-darkBlue">Flight Details</h3>
          </div>
          {singleFlightDetails?.prices?.totalBaseFare !== undefined && (
            <ul>
              <li>
                £{singleFlightDetails?.prices?.totalBaseFare} + £
                {singleFlightDetails?.prices?.totalTaxes} = £
                {singleFlightDetails?.prices?.totalFare}
              </li>
            </ul>
          )}
        </div>
        <div className="mb-2 px-6 text-gray-700">
          {singleFlightDetails?.departureCityCode} to{" "}
          {singleFlightDetails?.arrivalCityCode} <br />
          {singleFlightDetails?.departureTime} –
          {singleFlightDetails?.arrivalTime} <br />
          {flightSearchFormState.passengers.adults} x Adults,{" "}
          {flightSearchFormState.passengers.children} x Children,{" "}
          {flightSearchFormState.passengers.infants} x Infants
        </div>
      </div>
    );
  }
};

export default FlightSummary;
