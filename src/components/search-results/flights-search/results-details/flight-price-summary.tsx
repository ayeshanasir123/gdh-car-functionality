import React from "react";
import DetailsTitle from "./results-details-card/details-title";
import { priceData } from "@/data/flights/search-results/price-data";
import FlightPriceTitle from "./results-details-card/flight-price-title";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

interface FlightPriceDetailsProps {
  flightPriceDetails: {
    totalBaseFare: number;
    totalFare: number;
    totalTaxes: number;
  };
  singleFlightDetails: ISingleFlightDetails;
}

import { RootState } from "@/redux/store";
import { ISingleFlightDetails } from "@/interfaces/flights/ISingleFlightDetails";

const FlightPriceSummary = ({
  flightPriceDetails,
  singleFlightDetails,
}: FlightPriceDetailsProps) => {
  const flightState = useAppSelector((state: RootState) => state.flight);

  return (
    <div className="mt-6 rounded-lg border p-6">
      <DetailsTitle text="Price Summary" />
      {priceData.map((priceData) => {
        const totalPrice = flightPriceDetails.totalBaseFare;
        return (
          <div key={priceData.id}>
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-medium">
                Travelers {flightState?.passengers.adults}:{" "}
                {flightState?.passengers.adults *
                  flightPriceDetails.totalBaseFare}
              </h2>
              <h2 className="text-lg font-medium">£{totalPrice}</h2>
            </div>
            <div className="mt-2 flex flex-row justify-between">
              <FlightPriceTitle text={"Flight"} />

              <FlightPriceTitle text={`£${flightPriceDetails.totalBaseFare}`} />
            </div>
            <div className="mt-2 flex flex-row justify-between">
              <FlightPriceTitle text={"Taxes and Fees"} />

              <FlightPriceTitle text={`£${flightPriceDetails.totalTaxes}`} />
            </div>
            <hr className="mt-4" />
            <div className="mt-2 flex flex-row justify-between">
              <DetailsTitle text="Trip Total" />
              <FlightPriceTitle text={`£${flightPriceDetails.totalFare}`} />
            </div>
            <p className="text-sm font-semibold text-gray-600">
              Rates are quoted in GBP (£)
            </p>
            <Link
              href={{
                pathname:
                  "/flights/search-results/results-details/passenger-details",
                query: {
                  data: JSON.stringify({
                    singleFlightDetails,
                    flightPriceDetails,
                  }),
                },
              }}
            >
              <button className="mt-5 w-full rounded-lg bg-darkBlue p-2 font-bold text-white">
                Add Passenger Details
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FlightPriceSummary;
