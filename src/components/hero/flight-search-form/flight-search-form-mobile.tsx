import React, { useState } from "react";

import {
  ONE_WAY_FLIGHT_TYPE,
  ROUND_TRIP_FLIGHT_TYPE,
} from "@/constants/flights";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  setMessage,
  setSuccess,
  setAvailableFlights,
} from "@/redux/features/flights/get-available-flights-slice";

import {
  flightType,
  flyingFrom,
  destinationTo,
  flightClass,
  incrementAdults,
  incrementChildren,
  incrementInfants,
  decrementAdults,
  decrementChildren,
  decrementInfants,
  flightDepartureDate,
  flightReturnDate,
} from "@/redux/features/flights/flight-search-form-slice";

import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";

import { useGetAvailableFlightsMutation } from "@/redux/services/flights/flight-api";
import { useRouter } from "next/navigation";

import { prices } from "@/data/flights/flight-prices";

import { IFilteredAirports } from "@/interfaces/IFilteredAirPorts";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./custom-react-calendar.css";

import { dateFormat } from "@/utils/dateFormat";
import { IFlightSearchForm } from "@/interfaces/flights/IFlightSearchForm";

import airports from "@/data/airports-with-city-country-iata-data.json";

import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const tileContent = ({ date, view }: { date: Date; view: string }) => {
  if (view === "month") {
    const dateString = date.toISOString().split("T")[0];
    if (prices[dateString]) {
      return (
        <p
          className={`mt-4 text-[0.85rem] font-semibold text-darkBlue md:text-[1rem] ${prices[dateString] > 200 && "text-[#D1435A]"} ${prices[dateString] < 200 && "text-[#04A598]"}`}
          id="price"
        >
          £{prices[dateString]}
        </p>
      );
    }
  }
  return null;
};

const FlightSearchFormMobile = () => {
  const flightState = useAppSelector((state: RootState) => state.flight);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const today = new Date();

  const [localDate, setLocalDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const [getAvailableFlights, { data, error, isLoading }] =
    useGetAvailableFlightsMutation();

  const flightClassList = [
    { name: "Business", code: "J" },
    { name: "Economy", code: "Y" },
    { name: "First", code: "F" },
  ];

  // Dropdown Flags
  const [flyingFromDropDown, setFlyingFromDropDown] = useState(false);
  const [destinationToDropDown, setDestinationToDropDown] = useState(false);
  const [showDepartureDate, setShowDepartureDate] = useState(false);
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [passengerDropdown, setPassengerDropdown] = useState(false);
  const [flightClassDropdown, setFlightClassDropdown] = useState(false);

  const [filteredCities, setFilteredCities] = useState<IFilteredAirports[]>([]);

  const handleFlyingFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredCity = airports.filter((airport) => {
      // Airport: name, city, country, iata
      if (airport?.name !== "") {
        return (
          airport?.name.toLowerCase().includes(value.toLowerCase()) ||
          airport?.city.toLowerCase().includes(value.toLowerCase()) ||
          airport?.country.toLowerCase().includes(value.toLowerCase()) ||
          airport?.iata.toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    dispatch(flyingFrom({ name: value, code: "" }));

    if (errors?.flyingFrom?.name) {
      clearErrors("flyingFrom.name");
    }

    setFilteredCities(filteredCity);
  };

  const handleFlyingFromCityClick = (airport: IFilteredAirports) => {
    dispatch(flyingFrom({ name: airport?.name, code: airport?.iata }));

    setFilteredCities([]);

    setFlyingFromDropDown(false);
    setDestinationToDropDown(false);
  };

  const handleDestinationToChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    const filteredCity = airports.filter((airport) => {
      // Airport: name, city, country, iata
      if (airport?.name !== "") {
        return (
          airport?.name.toLowerCase().includes(value.toLowerCase()) ||
          airport?.city.toLowerCase().includes(value.toLowerCase()) ||
          airport?.country.toLowerCase().includes(value.toLowerCase()) ||
          airport?.iata.toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    dispatch(destinationTo({ name: value, code: "" }));

    if (errors?.destinationTo?.name) {
      clearErrors("destinationTo.name");
    }

    setFilteredCities(filteredCity);
  };

  const handleDestinationToCityClick = (airport: IFilteredAirports) => {
    dispatch(destinationTo({ name: airport.name, code: airport.iata }));

    setFilteredCities([]);
    setDestinationToDropDown(false);
  };

  const handleFlightClassClick = (flightClassData: {
    name: string;
    code: string;
  }) => {
    setFlightClassDropdown(false);
    dispatch(
      flightClass({ name: flightClassData.name, code: flightClassData.code }),
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IFlightSearchForm>({
    defaultValues: {
      flyingFrom: { name: "", code: "" },
      destinationTo: { name: "", code: "" },
      flightDepartureDate: today.toISOString().split("T")[0],
    },
  });

  const submitFlightForm: SubmitHandler<IFlightSearchForm> = async () => {
    try {
      let response;
      if (flightState.flightType === ROUND_TRIP_FLIGHT_TYPE) {
        response = await getAvailableFlights({
          numAdult: flightState.passengers.adults,
          numChild: flightState.passengers.children,
          numInfant: flightState.passengers.infants,
          cabinType: flightState.flightClass.code,
          tripType: flightState.flightType,
          legs: [
            {
              origin: flightState.flyingFrom.code,
              destination: flightState.destinationTo.code,
              departureDate: flightState.flightReturnDate[0],
            },
            {
              origin: flightState.destinationTo.code,
              destination: flightState.flyingFrom.code,
              departureDate: flightState.flightReturnDate[1],
            },
          ],
        }).unwrap();
      } else {
        response = await getAvailableFlights({
          numAdult: flightState.passengers.adults,
          numChild: flightState.passengers.children,
          numInfant: flightState.passengers.infants,
          cabinType: flightState.flightClass.code,
          tripType: flightState.flightType,
          legs: [
            {
              origin: flightState.flyingFrom.code,
              destination: flightState.destinationTo.code,
              departureDate: flightState.flightDepartureDate,
            },
          ],
        }).unwrap();
      }

      dispatch(setSuccess(response?.success));
      dispatch(setMessage(response?.message));
      dispatch(setAvailableFlights(response?.data?.flights));
    } catch (error) {
      console.error("Error in getting flights on mobile side", error);
    }

    if (error) {
      console.error("Error in getting flights", error);
    } else {
      router.push("/flights/search-results");
    }
  };

  const onFlightSearchFormSubmitError = (
    errors: FieldErrors<IFlightSearchForm>,
  ) => {
    console.log("Errors in Flight Form: ", errors);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
        <Image
          src="/assets/images/gdh-logo.svg"
          alt="Getdirectholidays Logo"
          width={300}
          height={46}
          className="h-[46px] w-[300px]"
        />

        <div className="loader h-16 w-16 animate-spin rounded-full border-8 border-t-8 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error in Fetching Flights</p>;
  }

  return (
    <form
      id="flight-search-form-mobile"
      onSubmit={handleSubmit(submitFlightForm, onFlightSearchFormSubmitError)}
    >
      {/* Tabs for Flight Type Starts */}
      <div className="mt-8 flex gap-4 border-b-2 border-[#EEEEEE] sm:gap-10">
        <div
          onClick={() => dispatch(flightType(ONE_WAY_FLIGHT_TYPE))}
          className={`cursor-pointer ${flightState.flightType === ONE_WAY_FLIGHT_TYPE ? "font-semibold text-lightBlue" : "text-[#999999]"} pb-3`}
        >
          One Way
        </div>

        <div
          onClick={() => dispatch(flightType(ROUND_TRIP_FLIGHT_TYPE))}
          className={`cursor-pointer ${flightState.flightType === ROUND_TRIP_FLIGHT_TYPE ? "font-semibold text-lightBlue" : "text-[#999999]"} pb-3`}
        >
          Round Trip
        </div>
      </div>
      {/* Tabs for Flight Type Ends */}

      {/* Show Components According to Flight Type */}
      <div className="mt-10 ">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Input Field: One Way Flying From */}
          <div className="relative sm:col-span-1">
            <div
              className={`flex items-center justify-between gap-3 rounded-md border-2 px-3 py-4 ${errors.flyingFrom && "border-red-500"}`}
              onClick={() => {
                setFlyingFromDropDown(!flyingFromDropDown);
                setDestinationToDropDown(false);
              }}
            >
              <Image
                src="/assets/icons/plane-take-off-icon.svg"
                alt="Plane Takeoff Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <input
                type="text"
                {...register("flyingFrom.name", {
                  validate: (value) => {
                    if (flightState.flyingFrom.code === "") {
                      return "Select airport name from suggestions";
                    }
                    return true;
                  },
                  required: {
                    value: true,
                    message: "Flying from field is required",
                  },
                })}
                value={flightState.flyingFrom.name}
                onChange={(e) => handleFlyingFromChange(e)}
                placeholder="Flying from"
                className="flex-grow border-none focus:border-transparent focus:outline-none"
                autoComplete="off"
                required
              />
            </div>

            {/* Flying From City with IATA Code Suggestion */}
            {flyingFromDropDown && (
              <div
                className={`absolute z-20 w-full rounded-md border bg-white`}
              >
                {filteredCities.length > 0 && (
                  <ul>
                    {filteredCities
                      .slice(0, 7)
                      .map((airport: IFilteredAirports) => (
                        <div key={airport.iata}>
                          <li
                            className="border p-4 text-[12px] font-medium text-darkBlue hover:bg-slate-50"
                            onClick={() => handleFlyingFromCityClick(airport)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                <Image
                                  src="/assets/icons/plane-take-off-icon.svg"
                                  alt="Icon for Flying From"
                                  width={1}
                                  height={16}
                                  className="mt-1 h-[16px] w-[16px]"
                                />
                                <div className="ml-4">
                                  <h4 className="text-[1rem] font-semibold">
                                    {airport?.name}
                                  </h4>
                                  <p className="">
                                    {airport?.city}, {airport?.country}
                                  </p>
                                </div>
                              </div>
                              <p className="rounded-md bg-darkBlue p-2 text-white">
                                {airport?.iata}
                              </p>
                            </div>
                          </li>
                        </div>
                      ))}
                  </ul>
                )}
              </div>
            )}

            {/* Flying From Error Message */}
            {errors?.flyingFrom?.name && (
              <p className="mt-1 text-[0.85rem] font-semibold text-red-400">
                {errors?.flyingFrom?.name?.message}
              </p>
            )}
          </div>

          {/* Input Field: One Way Destination To */}
          <div
            className="relative sm:col-span-1"
            onClick={() => {
              setFlyingFromDropDown(false);
              setDestinationToDropDown(!destinationToDropDown);
            }}
          >
            <div
              className={`flex items-center justify-between gap-3 rounded-md border-2 px-3 py-4 ${errors.destinationTo && "border-red-500"}`}
            >
              <Image
                src="/assets/icons/plane-landing-icon.svg"
                alt="Plane Landing Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <input
                type="text"
                {...register("destinationTo.name", {
                  validate: (value) => {
                    if (flightState.destinationTo.code === "") {
                      return "Select airport name from the suggestions";
                    }
                    return true;
                  },
                  required: {
                    value: true,
                    message: "Destination to field is required",
                  },
                })}
                value={flightState.destinationTo.name}
                onChange={(e) => handleDestinationToChange(e)}
                className="flex-grow border-none focus:border-transparent focus:outline-none"
                placeholder="Destination to"
                autoComplete="off"
                required
              />
            </div>

            {/* One Way Destination To City with IATA Code Suggestion */}
            {destinationToDropDown && (
              <div
                className={`absolute z-20 w-full rounded-md border bg-white`}
              >
                {filteredCities.length > 0 && (
                  <ul>
                    {filteredCities
                      .slice(0, 7)
                      .map((airport: IFilteredAirports) => (
                        <div key={airport.iata}>
                          <li
                            className="border p-4 text-[12px] font-medium text-darkBlue hover:bg-slate-50"
                            onClick={() =>
                              handleDestinationToCityClick(airport)
                            }
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                <Image
                                  src="/assets/icons/plane-take-off-icon.svg"
                                  alt="Icon for Flying From"
                                  width={1}
                                  height={16}
                                  className="mt-1 h-[16px] w-[16px]"
                                />
                                <div className="ml-4">
                                  <h4 className="text-[1rem] font-semibold">
                                    {airport?.name}
                                  </h4>
                                  <p className="">
                                    {airport?.city}, {airport?.country}
                                  </p>
                                </div>
                              </div>
                              <p className="rounded-md bg-darkBlue p-2 text-white">
                                {airport?.iata}
                              </p>
                            </div>
                          </li>
                        </div>
                      ))}
                  </ul>
                )}
              </div>
            )}

            {/* Destination To Error Message */}
            {errors?.destinationTo?.name && (
              <p className="mt-1 text-[0.85rem] font-semibold text-red-400">
                {errors?.destinationTo?.name?.message}
              </p>
            )}
          </div>

          {/* Input Field: Departure Date */}
          {flightState.flightType !== ROUND_TRIP_FLIGHT_TYPE && (
            <div className="col-span-1 sm:col-span-1">
              <div className="flex items-center gap-3 rounded-md border-2 px-3 py-4">
                <Datepicker
                  value={localDate}
                  onChange={(date) => {
                    setLocalDate(date);
                    dispatch(flightDepartureDate(date?.startDate));
                  }}
                  minDate={today}
                  asSingle={true}
                  inputClassName="w-full bg-transparent outline-none placeholder:text-[16px]"
                  placeholder="Departure Date"
                />

                {/* <Image
                  src="/assets/icons/calendar.svg"
                  alt="Calendar Icon for Departure Date"
                  height={16}
                  width={16}
                  className="h-[16px] w-[16px]"
                />

                <input
                  type="text"
                  placeholder="Departure Date"
                  defaultValue={flightState.flightDepartureDate}
                  onClick={() => {
                    setShowDepartureDate(!showDepartureDate);
                    setShowReturnDate(false);
                  }}
                  {...(register("flightDepartureDate"),
                  {
                    required: {
                      value: true,
                      message: "Departure date is required",
                    },
                  })}
                  className="w-full gap-3 border-none focus:border-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                /> */}

                {showDepartureDate && (
                  <>
                    <div
                      className="fixed right-0 top-0 z-50 m-4"
                      onClick={() => setShowDepartureDate(false)}
                    >
                      <Image
                        src="/assets/icons/cross.svg"
                        alt="Cross Icon"
                        width={20}
                        height={20}
                        className="h-[20px] w-[20px]"
                      />
                    </div>
                    <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center rounded-lg border bg-white p-2">
                      <Calendar
                        minDate={today}
                        // tileContent={tileContent}
                        value={flightState.flightDepartureDate}
                        onChange={(selectedDate) => {
                          const requiredDateFormat = dateFormat(selectedDate);
                          dispatch(flightDepartureDate(requiredDateFormat));
                          setShowDepartureDate(false);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Input Field: Round Trip Return Date */}
          {flightState.flightType === ROUND_TRIP_FLIGHT_TYPE && (
            <div className="col-span-1 sm:col-span-1">
              <div className="flex items-center gap-3 rounded-md border-2 px-3 py-4">
                <Datepicker
                  minDate={today}
                  value={localDate}
                  onChange={(date) => {
                    setLocalDate(date);
                    console.log("Date Selected: ", date);

                    dispatch(flightDepartureDate(date?.startDate));
                    dispatch(
                      flightReturnDate([date?.startDate, date?.endDate]),
                    );
                  }}
                  placeholder="Departure and Return Dates"
                  inputClassName="w-full z-20 bg-transparent outline-none placeholder:text-[16px]"
                />

                {/* <Image
                  src="/assets/icons/calendar.svg"
                  alt="Calendar Icon for Return Date"
                  height={16}
                  width={16}
                  className="h-[16px] w-[16px]"
                />

                <input
                  type="text"
                  placeholder="Departure and Return Date"
                  value={`Departure ${flightState.flightReturnDate[0]} - Return ${flightState.flightReturnDate[1]}`}
                  onClick={() => {
                    setShowDepartureDate(false);
                    setShowReturnDate(!showReturnDate);
                  }}
                  {...(register("flightReturnDate"),
                  {
                    required: {
                      value: true,
                      message: "Return date is required",
                    },
                  })}
                  className="w-full gap-3 border-none focus:border-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                /> */}

                {showReturnDate && (
                  <>
                    <div
                      className="fixed right-0 top-0 z-50 m-4"
                      onClick={() => setShowReturnDate(false)}
                    >
                      <Image
                        src="/assets/icons/cross.svg"
                        alt="Cross Icon"
                        width={20}
                        height={20}
                        className="h-[20px] w-[20px]"
                      />
                    </div>
                    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-white p-4">
                      <Calendar
                        value={flightState.flightReturnDate}
                        onChange={(selectedDates) => {
                          let departDate = dateFormat(selectedDates[0]);
                          let retDate = dateFormat(selectedDates[1]);
                          const departureArrivalDates = [departDate, retDate];

                          dispatch(flightReturnDate(departureArrivalDates));

                          setShowReturnDate(false);
                        }}
                        minDate={today}
                        // tileContent={tileContent}
                        selectRange={true}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Input Field: One Way Passengers */}
          <div className="relative order-5 sm:order-4">
            <div
              className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-4"
              onClick={(e) => {
                e.stopPropagation();
                setPassengerDropdown((prev) => !prev);
              }}
            >
              <Image
                src="/assets/icons/passenger.svg"
                alt="Passenger Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <input
                type="text"
                placeholder="Passengers - Adults, Children, and Infants"
                className="flex-grow border-none focus:border-transparent focus:outline-none"
                defaultValue={`Adults ${flightState.passengers.adults}, Children ${flightState.passengers.children}, Infants ${flightState.passengers.infants}`}
                required
              />
              <Image
                src="/assets/icons/dropdown.svg"
                alt="Dropdown Icon"
                height={10}
                width={10}
                className={`cursor-pointer transition-transform ${
                  passengerDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {passengerDropdown && (
              <div
                className="absolute z-10  mt-2 overflow-auto  rounded-lg border bg-white p-4  px-4 shadow-lg    "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {/* Adults */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="">
                    <p className="text-[16px] font-semibold text-darkBlue">
                      Adults
                    </p>
                    <p className="text-[14px] text-inActive">Aged 11+</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(decrementAdults())}
                    >
                      <Image
                        src="/assets/icons/minus-icon.svg"
                        alt="Decrement Icon"
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                    </button>
                    <div className="flex h-7 w-7 items-center justify-center text-lg font-bold text-darkBlue">
                      {flightState.passengers.adults}
                    </div>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(incrementAdults())}
                    >
                      <Image
                        src="/assets/icons/plus-icon.svg"
                        alt="Increment Icon"
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="">
                    <p className="text-[16px] font-semibold text-darkBlue">
                      Children
                    </p>
                    <p className="text-[14px] text-inActive">Aged 0 to 11</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(decrementChildren())}
                    >
                      <Image
                        src="/assets/icons/minus-icon.svg"
                        alt="Decrement Icon"
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                    </button>
                    <div className="flex h-7 w-7 items-center justify-center text-lg font-bold text-darkBlue">
                      {flightState.passengers.children}
                    </div>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(incrementChildren())}
                    >
                      <Image
                        src="/assets/icons/plus-icon.svg"
                        alt="Increment Icon"
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="">
                    <p className="text-[16px] font-semibold text-darkBlue">
                      Infants
                    </p>
                    <p className="text-[14px] text-inActive">
                      Aged 0 to 2 Years
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(decrementInfants())}
                    >
                      <Image
                        src="/assets/icons/minus-icon.svg"
                        alt="Decrement Icon"
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                    </button>
                    <div className="flex h-7 w-7 items-center justify-center text-lg font-bold text-darkBlue">
                      {flightState.passengers.infants}
                    </div>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(incrementInfants())}
                    >
                      <Image
                        src="/assets/icons/plus-icon.svg"
                        alt="Increment Icon"
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-[12px] text-inActive sm:text-[14px]">
                  Your age at the time of travel must be valid for the age
                  category booked. Airlines have restrictions on under 18s
                  traveling alone.
                </p>
                <p className="mt-3 text-[12px] text-inActive sm:text-[14px]">
                  Age limits and policies for traveling with children may vary
                  so please check with the airline before checking.
                </p>
              </div>
            )}
          </div>

          <div className="relative order-5 sm:order-5 sm:col-span-2">
            <div
              className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-4"
              onClick={(e) => {
                e.stopPropagation();
                setFlightClassDropdown((prev) => !prev);
              }}
            >
              <Image
                src="/assets/icons/plane.svg"
                alt="Icon for Flight Class"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <input
                type="text"
                placeholder="Economy"
                className="flex-grow cursor-pointer border-none focus:border-transparent focus:outline-none"
                value={flightState.flightClass.name}
                onChange={(e) => dispatch(flightClass(e.target.value))}
                required
              />

              <Image
                src="/assets/icons/dropdown.svg"
                alt="Dropdown Icon for Flight Class"
                height={10}
                width={10}
                className={`cursor-pointer transition-transform ${
                  flightClassDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Flight Class Dropdown */}
            {flightClassDropdown && (
              <div
                className="absolute right-1 z-10 mt-2 h-[120px] w-full overflow-auto rounded-lg border-2 bg-[#FFFFFF] px-2 text-[14px] font-medium text-[#374151]
            shadow-lg sm:w-full"
              >
                {flightClassList.map((flightClass) => (
                  <div
                    key={flightClass.code}
                    className="cursor-pointer p-2"
                    onMouseDown={() => handleFlightClassClick(flightClass)}
                  >
                    {flightClass.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Flight Button Starts */}
      <button
        type="submit"
        disabled={
          (flightState.flyingFrom.name &&
            flightState.destinationTo.name &&
            (flightState.flightDepartureDate ||
              flightState.flightReturnDate[0])) === ""
        }
        className="mr-3 mt-12 flex w-full items-center justify-center gap-[10px] rounded-lg bg-darkBlue py-4 text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={14}
          height={14}
        />
        Search Flights
      </button>
      {/* Search Flight Button Ends */}
    </form>
  );
};

export default FlightSearchFormMobile;
