"use client";
import React, { useState } from "react";
import ImageTextBasicComponent from "../ImageTextBasicComponent";
import Image from "next/image";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import {
  incrementAdults,
  decrementAdults,
  incrementChildren,
  decrementChildren,
  checkInDate,
  checkOutDate,
  destination,
  decrementRooms,
  incrementRooms,
} from "@/redux/features/hotels/hotel-search-form-slice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { RootState } from "@/redux/store";

import { useForm, SubmitHandler } from "react-hook-form";

import { useRouter } from "next/navigation";

import { cityWithIATACodes } from "@/data/cities-with-iata-codes";

import { useGetAvailableFlightsMutation } from "@/redux/services/flights/flight-api";

type HotelSearchFormType = {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  passengers: {
    adults: number;
    children: number;
    rooms: number;
  };
};

const HotelSearchFormDesktop = () => {
  const hotelState = useAppSelector((state: RootState) => state.hotel);
  const dispatch = useAppDispatch();

  const today = new Date();
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const [getAvailableFlights, { data, error, isLoading }] =
    useGetAvailableFlightsMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<HotelSearchFormType>();

  const router = useRouter();

  const [destinationToDropDown, setDestinationToDropDown] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleDateValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);

    const startDate = newValue?.startDate ? new Date(newValue.startDate) : null;
    const formattedStartDate = startDate
      ? startDate.toISOString().split("T")[0]
      : "";
    dispatch(checkInDate(formattedStartDate));

    const endDate = newValue?.endDate ? new Date(newValue.endDate) : null;
    const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : "";
    dispatch(checkOutDate(formattedEndDate));
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        <Image
          src="/assets/images/gdf-logo.svg"
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
    return <p>Error in Fetching Hotels</p>;
  }

  const handleDestinationToChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    dispatch(destination({ name: value }));
  };

  const onSubmit: SubmitHandler<HotelSearchFormType> = (data) => {
    console.log("Form data:", data);
  };
  return (
    <div className="rounded-[10px] bg-white px-8 pb-14 pt-8">
      <form id="hotel-search-form-desktop" onSubmit={handleSubmit(onSubmit)}>
        {/* Hotel Search Form Input Fields */}
        <div id="hotel-search-form-inputs-desktop" className="relative mt-8">
          <div className="flex gap-3">
            {/* Destination to input field */}
            <div
              className="relative flex-grow"
              onClick={() => setDestinationToDropDown(true)}
            >
              <div
                className={`flex h-12 items-center gap-3 rounded border ${errors.destination ? "border-red-500" : ""} py-2 pl-3`}
              >
                <Image
                  src="/assets/icons/plane-take-off-icon.svg"
                  alt="Icon for Destination To"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <input
                  type="text"
                  {...register("destination", { required: true })}
                  value={hotelState.destination?.name}
                  onChange={(e) => handleDestinationToChange(e)}
                  className="w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[16px]"
                  placeholder="Destination"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div
              className="relative flex-grow"
              onClick={() => setDestinationToDropDown(true)}
            >
              <div
                className={`flex h-12 items-center gap-3 rounded border ${errors.destination ? "border-red-500" : ""} py-2 pl-3`}
              >
                <div
                  className="relative flex cursor-pointer items-center gap-2 text-[14px] font-[500] text-[#10294D]"
                  onClick={() => toggleDropdown("passenger")}
                >
                  <ImageTextBasicComponent
                    text={`${hotelState?.passengers?.adults} Adults, ${hotelState?.passengers?.children} Children, ${hotelState?.passengers?.rooms} Rooms`}
                    img="/assets/icons/passengers-icon.svg"
                    height={14}
                    width={14}
                    gap={2}
                  />

                  <Image
                    src="/assets/icons/drop-down-icon.svg"
                    alt="drop-down-icon"
                    height={4}
                    width={8}
                    className={`h-auto w-auto transition-transform ${
                      openDropdown === "passenger" ? "rotate-180" : "rotate-0"
                    }`}
                  />

                  {openDropdown === "passenger" && (
                    <div
                      className="absolute left-0 top-full z-20 mt-2 h-auto w-[284px] rounded-lg border bg-white p-4 shadow-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      {/* Adults */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="mt-3">
                          <p className="text-[16px] font-semibold text-darkBlue">
                            Adults
                          </p>
                          <p className="text-[14px] text-inActive">Aged 16+</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10294D] p-2 text-white"
                            onClick={() => dispatch(decrementAdults())}
                          >
                            <Image
                              src="/assets/icons/minus-icon.svg"
                              alt="Decrement Adults Button"
                              width={14}
                              height={14}
                            />
                          </button>
                          <div className="flex h-7 w-7 items-center justify-center text-lg font-bold text-darkBlue">
                            {hotelState?.passengers?.adults}
                          </div>
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10294D] p-2 text-white"
                            onClick={() => dispatch(incrementAdults())}
                          >
                            <Image
                              src="/assets/icons/plus-icon.svg"
                              alt="Increment Adults Button"
                              width={14}
                              height={14}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="mt-2">
                          <p className="text-[16px] font-semibold text-darkBlue">
                            Children
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10294D] text-white"
                            onClick={() => dispatch(decrementChildren())}
                          >
                            <Image
                              src="/assets/icons/minus-icon.svg"
                              alt="decrement"
                              width={18}
                              height={14}
                            />
                          </button>
                          <div className="flex h-7 w-7 items-center justify-center text-lg font-bold text-darkBlue">
                            {hotelState?.passengers?.children}
                          </div>
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10294D] text-white"
                            onClick={() => dispatch(incrementChildren())}
                          >
                            <Image
                              src="/assets/icons/plus-icon.svg"
                              alt="increment"
                              width={16}
                              height={16}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Infants  */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="mt-2">
                          <p className="text-[16px] font-semibold text-darkBlue">
                            Rooms
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10294D] p-2 text-white"
                            onClick={() => dispatch(decrementRooms())}
                          >
                            <Image
                              src="/assets/icons/minus-icon.svg"
                              alt="Decrement Rooms Button"
                              width={14}
                              height={14}
                            />
                          </button>
                          <div className="flex h-7 w-7 items-center justify-center text-lg font-bold text-darkBlue">
                            {hotelState?.passengers?.rooms}
                          </div>
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10294D] p-2 text-white"
                            onClick={() => dispatch(incrementRooms())}
                          >
                            <Image
                              src="/assets/icons/plus-icon.svg"
                              alt="Increment Rooms Button"
                              width={14}
                              height={14}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Input Field: Desktop checkin and checkout Date */}

            <div className="flex-grow">
              <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
                <Datepicker
                  value={dateValue}
                  onChange={handleDateValueChange}
                  minDate={today}
                  placeholder="Check in date ~ Check out date"
                  inputClassName="w-full bg-transparent outline-none"
                  showShortcuts={true}
                  showFooter={true}
                />
              </div>
            </div>

            {/* Desktop Search Button */}
            <div className="flex h-12 w-full min-w-[110px] items-center justify-center rounded-[4px] bg-darkBlue px-4 py-2 text-[16px] font-[600] text-white sm:w-[10%]">
              <button className={`flex items-center gap-[6px]`}>
                <Image
                  src="/assets/icons/search-icon.svg"
                  alt="Icon for Search hotels"
                  width={14}
                  height={14}
                  className="h-[14px] w-[14px]"
                />
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelSearchFormDesktop;
