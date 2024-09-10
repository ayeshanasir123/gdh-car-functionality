import React, { useState } from "react";
import Image from "next/image";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

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

import { useForm, SubmitHandler } from "react-hook-form";

import { useGetAvailableFlightsMutation } from "@/redux/services/flights/flight-api";
import { useRouter } from "next/navigation";
import { cityWithIATACodes } from "@/data/cities-with-iata-codes";

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

const HotelSearchFormMobile = () => {
  const hotelState = useAppSelector((state: RootState) => state.hotel);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const today = new Date();

  const [passengerDropdown, setPassengerDropdown] = useState(false);
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

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

  const [getAvailableFlights, { data, error, isLoading }] =
    useGetAvailableFlightsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HotelSearchFormType>();

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
    <form id="hotel-search-form-mobile" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="sm:col-span-1"
            // onClick={() => setDestination()}
          >
            <div className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2">
              <Image
                src="/assets/icons/plane-take-off-icon.svg"
                alt="Plane Takeoff Icon"
                height={16}
                width={16}
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

          <div className="col-span-1 sm:col-span-1">
            <div className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2">
              <Datepicker
                value={dateValue}
                onChange={handleDateValueChange}
                minDate={today}
                placeholder="Check in date ~ Check out date"
                inputClassName="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="relative sm:col-span-2">
            <div
              className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2"
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
                value={`Adults ${hotelState.passengers.adults}, Children ${hotelState.passengers.children}, Rooms ${hotelState.passengers.rooms}`}
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
                className="absolute z-10 mt-2 w-full overflow-auto rounded-lg border bg-white p-4 px-6 shadow-lg"
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
                    <p className="text-[14px] text-inActive">Aged 16+</p>
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
                      {hotelState.passengers.adults}
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
                    <p className="text-[14px] text-inActive">Aged 0 to 15</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
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
                      {hotelState.passengers.children}
                    </div>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
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

                {/* Infants */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="">
                    <p className="text-[16px] font-semibold text-darkBlue">
                      Rooms
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(decrementRooms())}
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
                      {hotelState.passengers.rooms}
                    </div>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-darkBlue text-white"
                      onClick={() => dispatch(incrementRooms())}
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

                <button className="mb-2 mt-3 w-full rounded-md bg-darkBlue px-8 py-2 text-[16px] text-white">
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className=" mr-3 mt-12 flex w-full items-center justify-center gap-[10px] rounded-lg bg-darkBlue py-3 text-white"
      >
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={14}
          height={14}
        />
        Search Hotels
      </button>
    </form>
  );
};

export default HotelSearchFormMobile;
