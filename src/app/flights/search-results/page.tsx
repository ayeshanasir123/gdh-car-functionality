"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  airlinesFilterList,
  airportsFilterList,
  stopsFilterList,
} from "@/data/flights/search-results/filters-data";
import Image from "next/image";

import SearchResultsFilter from "@/components/search-results/search-results-filters/search-results-filters";
import {
  AirlinesFormSchema,
  AirportsFormSchema,
  StopsFormSchema,
} from "@/components/search-results/search-results-filters/filter-form-schema";

import SearchResultsMain from "@/components/search-results/search-results-main/search-results-main";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import FlightSearchFormDesktop from "@/components/hero/flight-search-form/flight-search-form-desktop";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ROUND_TRIP_FLIGHT_TYPE } from "@/constants/flights";
import FlightSearchFormMobile from "@/components/hero/flight-search-form/flight-search-form-mobile";
import ClientBreadcrumbWrapper from "@/components/hero/client-breadcrumb-wrapper";
import MobileNavbar from "@/components/mobile-navbar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SearchResults = () => {
  const {
    flyingFrom,
    destinationTo,
    flightDepartureDate,
    flightReturnDate,
    flightType,
  } = useAppSelector((state: RootState) => state.flight);

  const getAvailableFlightState = useAppSelector(
    (state: RootState) => state.getAvailableFlights,
  );

  const [showFilter, setShowFilter] = useState(false);
  const stopsForm = useForm<z.infer<typeof StopsFormSchema>>({
    resolver: zodResolver(StopsFormSchema),
    defaultValues: {
      stops: ["non-stop"],
    },
  });

  const airlinesForm = useForm<z.infer<typeof AirlinesFormSchema>>({
    resolver: zodResolver(AirlinesFormSchema),
    defaultValues: {
      airlines: ["british-airways"],
    },
  });

  const airportsForm = useForm<z.infer<typeof AirportsFormSchema>>({
    resolver: zodResolver(AirportsFormSchema),
    defaultValues: {
      airports: ["lhr"],
    },
  });

  return (
    <section>
      {/* Flight Search Results Header */}
      <div
        id="flight-search-results-form"
        className="container mx-auto my-8 rounded-lg"
      >
        <div className="my-8">
          <MobileNavbar />
        </div>

        {/* Flight Search Form Accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {getAvailableFlightState.flights.length > 0 ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="flex items-center gap-4 text-2xl font-semibold tracking-tight">
                    <span>{flyingFrom?.code}</span>
                    <Image
                      src="/assets/icons/right-arrow-icon.svg"
                      alt="Right Arrow Icon"
                      width={30}
                      height={30}
                      className="h-[30px] w-[30px]"
                    />
                    <span>
                      {destinationTo ? destinationTo?.code : "Destination City"}
                    </span>
                  </h3>

                  <p className="text-md flex items-center gap-4 text-muted-foreground">
                    <span>{flightDepartureDate || flightReturnDate[0]}</span>
                    {flightType === ROUND_TRIP_FLIGHT_TYPE ? (
                      <>
                        <Image
                          src="/assets/icons/right-arrow-icon.svg"
                          alt="Right Arrow Icon"
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px]"
                        />
                        <span>{flightReturnDate[1]}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ) : (
                <h3>Flight Search Form</h3>
              )}
            </AccordionTrigger>

            <AccordionContent>
              <div className="hidden lg:block">
                <FlightSearchFormDesktop />
              </div>
              <div className="block lg:hidden">
                <FlightSearchFormMobile />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="bg-gray-100 pt-4">
        <div className="mx-auto p-1 md:container">
          {/* Desktop BreadCrumbs and Filters */}
          {getAvailableFlightState.flights.length > 0 && (
            <div className="flex items-center justify-between px-4">
              <div>
                <ClientBreadcrumbWrapper />
              </div>

              {/* Desktop Filter Button */}
              <div
                className="hidden items-center md:flex"
                onClick={() => setShowFilter((prev) => !prev)}
              >
                <Image
                  src="/assets/icons/filter-icon.svg"
                  alt="Filter Icon"
                  width={14}
                  height={14}
                  className="h-[14px] w-[14px]"
                />
                <span className="ml-[8px] cursor-pointer text-[14px] text-darkBlue hover:underline">
                  {!!showFilter ? "Hide" : "Show"} Filters
                </span>
              </div>
            </div>
          )}

          {/* Mobile Filter Open */}
          <Sheet>
            <SheetTrigger className="w-full">
              {/* Mobile Filter Button */}
              {getAvailableFlightState.flights.length > 0 && (
                <div className="my-4 flex w-full items-center justify-center rounded bg-darkBlue p-4 text-white md:hidden">
                  <Image
                    src="/assets/icons/white-filter-icon.svg"
                    alt="Filter Icon"
                    width={14}
                    height={14}
                  />
                  <span className="ml-[10px] text-[1.25rem] font-semibold">
                    Filters
                  </span>
                </div>
              )}
              {/* Mobile Filter Button Ends */}
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>

              <aside
                className={`sidebar rounded-lg bg-white p-4 shadow-md md:col-span-1 md:hidden ${showFilter ? "lg:block" : "lg:hidden"}`}
              >
                <SearchResultsFilter
                  defaultValue="stops"
                  filterName="Stops"
                  filterFormSchema={StopsFormSchema}
                  filterForm={stopsForm}
                  filterList={stopsFilterList}
                />

                <SearchResultsFilter
                  defaultValue="airlines"
                  filterName="Airlines"
                  filterFormSchema={AirlinesFormSchema}
                  filterForm={airlinesForm}
                  filterList={airlinesFilterList}
                />

                <SearchResultsFilter
                  defaultValue="airports"
                  filterName="Airports"
                  filterFormSchema={AirportsFormSchema}
                  filterForm={airportsForm}
                  filterList={airportsFilterList}
                />
              </aside>
            </SheetContent>
          </Sheet>
          {/* Mobile Filter Closed */}

          <div
            className={`container mx-auto grid grid-cols-1 gap-4 p-4 md:grid-cols-4`}
          >
            {/* Sidebar */}
            <aside
              className={`sidebar hidden rounded-lg bg-white p-4 shadow-md md:col-span-1 md:hidden ${showFilter ? "lg:block" : "lg:hidden"}`}
            >
              <SearchResultsFilter
                defaultValue="stops"
                filterName="Stops"
                filterFormSchema={StopsFormSchema}
                filterForm={stopsForm}
                filterList={stopsFilterList}
              />

              <SearchResultsFilter
                defaultValue="airlines"
                filterName="Airlines"
                filterFormSchema={AirlinesFormSchema}
                filterForm={airlinesForm}
                filterList={airlinesFilterList}
              />

              <SearchResultsFilter
                defaultValue="airports"
                filterName="Airports"
                filterFormSchema={AirportsFormSchema}
                filterForm={airportsForm}
                filterList={airportsFilterList}
              />
            </aside>

            {/* Search Results */}
            <div
              className={`main-content rounded-lg md:p-4 ${showFilter ? "md:col-span-3" : "md:col-span-4"}`}
            >
              <SearchResultsMain />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
