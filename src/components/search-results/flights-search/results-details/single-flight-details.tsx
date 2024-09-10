"use client";
import React from "react";
import Image from "next/image";

import { ISingleFlightDetails } from "@/interfaces/flights/ISingleFlightDetails";
import { durationFormat } from "@/utils/durationFormat";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";

interface SingleFlightDetailsProps {
  singleFlightDetails: ISingleFlightDetails;
}

const SingleFlightDetails = ({
  singleFlightDetails,
}: SingleFlightDetailsProps) => {
  const flightState = useAppSelector((state: RootState) => state.flight);

  console.log("Singe flight details: ", singleFlightDetails);
  if (singleFlightDetails.departureCityCode !== undefined) {
    return (
      <div className="mt-2">
        <div className="mt-4 rounded-lg border p-6">
          {flightState?.flyingFrom.name !== "" && (
            <h2 className="text-lg font-bold md:text-2xl">
              You searched for details:{" "}
              {/* <span className="text-md font-medium text-placeholder">From</span>{" "} */}
              {flightState.flyingFrom.name}{" "}
              <span className="text-md font-medium text-placeholder">To</span>{" "}
              {flightState.destinationTo.name}
            </h2>
          )}

          {/* Airline Image */}
          <div className="mt-2 flex">
            {/* <Image
              src={individualFlightDetails.airlineImage}
              alt="Airline Image"
              width={30}
              height={30}
            /> */}
          </div>
          {/* Flight Details Starts */}
          <div>
            {/* Flight Departure City Code */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/plane-take-off-icon.svg"
                alt="Plane Landing Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Flight Departure City:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {singleFlightDetails.departureCityCode}
                </span>
              </h3>
            </div>

            {/* Flight Departure Time */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/plane-take-off-icon.svg"
                alt="Plane Landing Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Flight Departure Time:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {singleFlightDetails.departureTime}
                </span>
              </h3>
            </div>

            {/* Flight Class Comes Here.. */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/plane.svg"
                alt="Clock Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Flight Class:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {singleFlightDetails.flightClass}
                </span>
              </h3>
            </div>

            {/* Flight Number */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/plane.svg"
                alt="Clock Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Flight Number:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {singleFlightDetails.flightNumber}
                </span>
              </h3>
            </div>

            {/* Flight Duration */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/clock-icon.svg"
                alt="Clock Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Flight Duration:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {durationFormat(singleFlightDetails.duration)}
                </span>
              </h3>
            </div>

            {/* Number of Stops */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/plane.svg"
                alt="Clock Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Number of Stops:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {singleFlightDetails.stopCount}
                </span>
              </h3>
            </div>

            {/* Flight Arrival Time */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/plane-landing-icon.svg"
                alt="Plane Landing Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Flight Arrival Time:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {singleFlightDetails.arrivalTime}
                </span>
              </h3>
            </div>

            {/* Flight Arrival City */}
            <div className="flex items-center">
              <Image
                src="/assets/icons/plane-landing-icon.svg"
                alt="Plane Landing Icon"
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <h3 className="my-4 font-semibold text-darkBlue">
                <span className="text-md font-medium text-placeholder">
                  Flight Arrival City:
                </span>{" "}
                <span className="text-[1.2rem] font-semibold text-darkBlue">
                  {singleFlightDetails.arrivalCityCode}
                </span>
              </h3>
            </div>
          </div>
          {/* Flight Details Ends */}
        </div>
      </div>
    );
  } else {
    return (
      <h2 className="text-[1.5rem]">
        Data has expired! Please visit{" "}
        <Link href="/" className="text-bold underline">
          Home
        </Link>{" "}
        for fresh results
      </h2>
    );
  }
};

export default SingleFlightDetails;
