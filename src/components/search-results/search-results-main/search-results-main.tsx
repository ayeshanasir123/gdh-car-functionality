import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TabTitle from "./tabs/tab-title";
import FlightCityCode from "./search-results-card/flight-city-code";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import {
  IFlightSearchResult,
  IFlightSearchResultSegment,
} from "@/interfaces/flights/IFlightSearchResults";

import { convertTo12HourFormat } from "@/utils/convertTo12HourFormat";
import { durationFormat } from "@/utils/durationFormat";

import airlines from "@/data/airlines-with-images.json";

const SearchResultsMain = () => {
  const availableFlights = useAppSelector(
    (state: RootState) => state.getAvailableFlights,
  );

  const flightSearchFormState = useAppSelector(
    (state: RootState) => state.flight,
  );

  const dispatch = useAppDispatch();

  const cheapFlights = [...(availableFlights?.flights || [])]?.sort(
    (flightA, flightB) => {
      const priceA = parseFloat(flightA?.price?.totalFare);
      const priceB = parseFloat(flightB?.price?.totalFare);
      return priceA - priceB;
    },
  );

  const calculateTotalDuration = (flight) => {
    return flight.legs.reduce((total, leg) => {
      return (
        total +
        leg.segment.reduce((legTotal, segment) => {
          return legTotal + parseInt(segment.duration, 10);
        }, 0)
      );
    }, 0);
  };

  const fastestFlights = [...(availableFlights?.flights || [])]?.sort(
    (flightA, flightB) => {
      const totalDurationA = calculateTotalDuration(flightA);
      const totalDurationB = calculateTotalDuration(flightB);

      return totalDurationA - totalDurationB;
    },
  );

  const recommendedFlights = [];

  if (
    availableFlights?.success &&
    availableFlights?.flights &&
    availableFlights?.flights.length !== undefined &&
    availableFlights?.flights.length > 0
  ) {
    return (
      <Tabs
        defaultValue="cheapest"
        className="items-between flex w-full flex-col"
      >
        <TabsList className="flex grow justify-evenly border">
          <TabsTrigger className="flex flex-1 flex-col " value="cheapest">
            <TabTitle text="Cheapest" />
          </TabsTrigger>
          <TabsTrigger className="flex flex-1 flex-col " value="recommended">
            <TabTitle text="Recommended" />
            {/* <TabDescription text="$787 - 11h, 1 Stop" /> */}
          </TabsTrigger>
          <TabsTrigger className="flex flex-1 flex-col " value="fastest">
            <TabTitle text="Fastest" />
            {/* <TabDescription text="$987 - 11h, 1 Stop" /> */}
          </TabsTrigger>
        </TabsList>

        <TabsContent className="grow" value="cheapest">
          {cheapFlights?.map(
            (SingleFlightResult: IFlightSearchResult, index: number) => {
              return (
                // Flight Card
                <div
                  className="mt-4 rounded-md border bg-white p-4 hover:border-darkBlue"
                  id="search-results-card"
                  key={index}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Left Side Starts */}
                    <div className="grow">
                      {/* Top Side Starts */}
                      <div className="m-4 flex grow flex-wrap items-center">
                        {/* Card's Left Side */}

                        {/* Card Center Starts */}
                        <div className="items-between flex grow-[2] flex-col flex-wrap justify-between gap-6">
                          {SingleFlightResult?.legs[0].segment.map(
                            (
                              SingleSegment: IFlightSearchResultSegment,
                              segmentIndex: number,
                            ) => {
                              let arrivalTime =
                                SingleSegment?.arrival?.arrivalDateTime?.split(
                                  "T",
                                )[1];
                              arrivalTime = convertTo12HourFormat(arrivalTime);

                              let departureTime =
                                SingleSegment?.departure?.departureDateTime?.split(
                                  "T",
                                )[1];
                              departureTime =
                                convertTo12HourFormat(departureTime);

                              const airline =
                                airlines.find(
                                  (airline) =>
                                    airline.code ===
                                    SingleSegment?.operating?.code,
                                )?.airlineImagePath ||
                                "/assets/images/airlines/airline-emirates-image.jpg";

                              return (
                                <div
                                  key={segmentIndex}
                                  className="flex grow flex-wrap items-center gap-2 md:gap-8"
                                >
                                  <div className="flex grow justify-center">
                                    <Image
                                      src={airline}
                                      alt={"Airline Logo"}
                                      width={60}
                                      height={60}
                                      className="h-auto w-[60px] max-w-full rounded  object-cover"
                                    />
                                  </div>
                                  <div className="flex grow items-center justify-center gap-6">
                                    {/* Departure Segment */}
                                    <div className="flex flex-col items-end gap-2 p-2">
                                      <Image
                                        src="/assets/icons/plane-take-off-icon.svg"
                                        alt="Plane Take Off Icon"
                                        width={16}
                                        height={16}
                                        className="h-[16px] w-[16px]"
                                      />
                                      <h4 className="text-[18px] font-semibold text-darkBlue">
                                        {departureTime}
                                      </h4>
                                      <p className="text-right font-semibold text-[#64748B]">
                                        {SingleSegment?.departure?.code}
                                      </p>
                                    </div>

                                    {/* Duration and Stops Segment */}
                                    <div className="flex items-center justify-between">
                                      <div className="text-center">
                                        <span className="text-[0.8rem]">
                                          {SingleSegment?.stopCount} Stop
                                        </span>
                                        <div className="m-1 h-0.5 w-full grow bg-darkBlue text-[12px]"></div>
                                        <span className="text-[0.8rem]">
                                          {durationFormat(
                                            SingleSegment?.duration,
                                          )}{" "}
                                          Duration
                                        </span>
                                      </div>
                                    </div>

                                    {/* Arrival Segment */}
                                    <div className="flex flex-col items-start gap-2 p-2">
                                      <Image
                                        src="/assets/icons/plane-landing-icon.svg"
                                        alt="Plane Landing Icon"
                                        width={14}
                                        height={14}
                                        className="h-[14px] w-[14px]"
                                      />
                                      <h4 className="text-[18px] font-semibold text-darkBlue">
                                        {arrivalTime}
                                      </h4>
                                      <FlightCityCode
                                        text={SingleSegment?.arrival?.code}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            },
                          )}
                        </div>
                        {/* Card Center Ends */}
                      </div>
                      {/* Top Side Ends */}
                    </div>
                    {/* Left Side Ends */}

                    {/* Card's Right Side Starts */}
                    <div className="flex min-h-[12rem] grow flex-col justify-between p-4">
                      <div className="flex items-center justify-between px-1">
                        <Image
                          src="/assets/icons/share-icon.svg"
                          alt="Share Icon"
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px]"
                        />
                        <h3 className="text-[24px] font-semibold">
                          £{parseInt(SingleFlightResult?.price?.totalFare)}
                        </h3>
                      </div>
                      <Link
                        className="flex justify-end"
                        href={{
                          pathname: "/flights/search-results/results-details",
                          query: {
                            data: JSON.stringify(SingleFlightResult),
                          },
                        }}
                      >
                        <Button
                          type="button"
                          className="w-full"
                          onClick={() => {}}
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                    {/* Card's Right Side Ends */}
                  </div>
                </div>
              );
            },
          )}
        </TabsContent>
        <TabsContent className="grow" value="recommended">
          Recommended flights list will show here
        </TabsContent>
        <TabsContent className="grow" value="fastest">
          {fastestFlights?.map(
            (SingleFlightResult: IFlightSearchResult, index: number) => {
              return (
                // Flight Card
                <div
                  className="mt-4 rounded-md border bg-white p-4 hover:border-darkBlue"
                  id="search-results-card"
                  key={index}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Left Side Starts */}
                    <div className="grow">
                      {/* Top Side Starts */}
                      <div className="m-4 flex grow flex-wrap items-center">
                        {/* Card's Left Side */}

                        {/* Card Center Starts */}
                        <div className="items-between flex grow-[2] flex-col flex-wrap justify-between gap-6">
                          {SingleFlightResult?.legs[0].segment.map(
                            (
                              SingleSegment: IFlightSearchResultSegment,
                              segmentIndex: number,
                            ) => {
                              let arrivalTime =
                                SingleSegment?.arrival?.arrivalDateTime?.split(
                                  "T",
                                )[1];
                              arrivalTime = convertTo12HourFormat(arrivalTime);

                              let departureTime =
                                SingleSegment?.departure?.departureDateTime?.split(
                                  "T",
                                )[1];
                              departureTime =
                                convertTo12HourFormat(departureTime);

                              const airline =
                                airlines.find(
                                  (airline) =>
                                    airline.code ===
                                    SingleSegment?.operating?.code,
                                )?.airlineImagePath ||
                                "/assets/images/airlines/airline-emirates-image.jpg";

                              return (
                                <div
                                  key={segmentIndex}
                                  className="flex grow flex-wrap items-center gap-2 md:gap-8"
                                >
                                  <div className="flex grow justify-center">
                                    <Image
                                      src={airline}
                                      alt={"Airline Logo"}
                                      width={60}
                                      height={60}
                                      className="h-auto w-[60px] max-w-full rounded  object-cover"
                                    />
                                  </div>
                                  <div className="flex grow items-center justify-center gap-6">
                                    {/* Departure Segment */}
                                    <div className="flex flex-col items-end gap-2 p-2">
                                      <Image
                                        src="/assets/icons/plane-take-off-icon.svg"
                                        alt="Plane Take Off Icon"
                                        width={16}
                                        height={16}
                                        className="h-[16px] w-[16px]"
                                      />
                                      <h4 className="text-[18px] font-semibold text-darkBlue">
                                        {departureTime}
                                      </h4>
                                      <p className="text-right font-semibold text-[#64748B]">
                                        {SingleSegment?.departure?.code}
                                      </p>
                                    </div>

                                    {/* Duration and Stops Segment */}
                                    <div className="flex items-center justify-between">
                                      <div className="text-center">
                                        <span className="text-[0.8rem]">
                                          {SingleSegment?.stopCount} Stop
                                        </span>
                                        <div className="m-1 h-0.5 w-full grow bg-darkBlue text-[12px]"></div>
                                        <span className="text-[0.8rem]">
                                          {durationFormat(
                                            SingleSegment?.duration,
                                          )}{" "}
                                          Duration
                                        </span>
                                      </div>
                                    </div>

                                    {/* Arrival Segment */}
                                    <div className="flex flex-col items-start gap-2 p-2">
                                      <Image
                                        src="/assets/icons/plane-landing-icon.svg"
                                        alt="Plane Landing Icon"
                                        width={14}
                                        height={14}
                                        className="h-[14px] w-[14px]"
                                      />
                                      <h4 className="text-[18px] font-semibold text-darkBlue">
                                        {arrivalTime}
                                      </h4>
                                      <FlightCityCode
                                        text={SingleSegment?.arrival?.code}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            },
                          )}
                        </div>
                        {/* Card Center Ends */}
                      </div>
                      {/* Top Side Ends */}
                    </div>
                    {/* Left Side Ends */}

                    {/* Card's Right Side Starts */}
                    <div className="flex min-h-[12rem] grow flex-col justify-between p-4">
                      <div className="flex items-center justify-between px-1">
                        <Image
                          src="/assets/icons/share-icon.svg"
                          alt="Share Icon"
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px]"
                        />
                        <h3 className="text-[24px] font-semibold">
                          £{parseInt(SingleFlightResult?.price?.totalFare)}
                        </h3>
                      </div>
                      <Link
                        className="flex justify-end"
                        href={{
                          pathname: "/flights/search-results/results-details",
                          query: {
                            data: JSON.stringify(SingleFlightResult),
                          },
                        }}
                      >
                        <Button
                          type="button"
                          className="w-full"
                          onClick={() => {}}
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                    {/* Card's Right Side Ends */}
                  </div>
                </div>
              );
            },
          )}
        </TabsContent>
      </Tabs>
    );
  } else {
    return (
      <h2 className="font-semibold text-darkBlue">
        No flights found for your search, please visit{" "}
        <Link href="/" className="font-semibold underline">
          Home
        </Link>{" "}
        page to search for flights.
        {availableFlights?.success && (
          <div className="text-red-500">
            {availableFlights?.message} from{" "}
            <span className="underline">
              {flightSearchFormState.flyingFrom.name}
            </span>{" "}
            to{" "}
            <span className="underline">
              {flightSearchFormState.destinationTo.name}
            </span>{" "}
            for departure date{" "}
            <span className="underline">
              {flightSearchFormState.departureDate}
            </span>
          </div>
        )}
      </h2>
    );
  }
};

export default SearchResultsMain;
