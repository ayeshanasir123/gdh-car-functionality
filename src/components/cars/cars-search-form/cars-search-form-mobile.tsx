import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

import {
  location,
  pickUpDate,
  pickUpTime,
  dropOffDate,
  dropOffTime,
} from "@/redux/features/cars/car-search-form-slice";

const CarsSearchFormMobile = () => {
  const carSearchFormState = useAppSelector(
    (state: RootState) => state.carSearchForm,
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const today = new Date();

  // Helper function to format dates and times
  const formatDateTime = (date) => {
    if (!date) return "";
    const localDate = new Date(date.toLocaleString()); // Ensure local time zone
    return localDate.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
  };

  const formatTime = (date) => {
    if (!date) return "";
    const localDate = new Date(date.toLocaleString()); // Ensure local time zone
    return localDate.toISOString().split("T")[1].split(".")[0]; // Format time to HH:mm:ss
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(carSearchFormState.dropOffDate);
  
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      location: carSearchFormState.location.name,
      pickUpDate: carSearchFormState.pickUpDate,
      // pickUpDate: formatDateTime(carSearchFormState.pickUpDate),
      pickUpTime: formatTime(carSearchFormState.pickUpTime),
      dropOffDate: carSearchFormState.dropOffDate,
      // dropOffDate: formatDateTime(carSearchFormState.dropOffDate),
      dropOffTime: formatTime(carSearchFormState.dropOffTime),
    }).toString();
  
    // Navigate to the next page with the query parameters
    router.push(`/flights/search-results/car-search?${queryParams}`);
  };

  return (
    <form id="flight-search-form-mobile" onSubmit={handleSubmit}>
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Input Field: Select Location */}
          <div
            id="location-mobile"
            className="sm:col-span-1"
            onClick={() => {}}
          >
            <div className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2">
              <Image
                src="/assets/icons/location-icon.svg"
                alt="Location Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <input
                type="text"
                value={carSearchFormState.location.name}
                onChange={(e) => {
                  dispatch(location({ name: e.target.value, code: "" }));
                }}
                placeholder="Select Location"
                className="flex-grow border-none focus:border-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Input Field: PickUp Date */}
          <div
            id="pickup-date-mobile"
            className="sm:col-span-1"
            onClick={() => {}}
          >
            <div className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2">
              <Image
                src="/assets/icons/calendar-icon.svg"
                alt="Calendar Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />

              <DatePicker
                selected={carSearchFormState.pickUpDate}
                onChange={(date) => {
                  dispatch(pickUpDate(date));
                }}
                minDate={today}
                placeholderText="PickUp Date"
                className="w-full gap-3 border-none focus:border-transparent focus:outline-none"
                wrapperClassName="flex-grow"
                popperClassName="z-10"
                required
              />
            </div>
          </div>

          {/* Input Field: PickUp Time */}
          <div id="pickup-time-mobile" className="col-span-1 sm:col-span-1">
            <div className="flex items-center gap-3 rounded-md border-2 px-3 py-2">
              <Image
                src="/assets/icons/clock-icon.svg"
                alt="Clock Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <DatePicker
                selected={carSearchFormState.pickUpTime ? new Date(carSearchFormState.pickUpTime) : null}
                onChange={(time) => {
                  dispatch(pickUpTime(time));
                }}
                placeholderText="PickUp Time"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>

          {/* Input Field: DropOff Date */}
          <div id="drop-off-date-mobile" className="col-span-1 sm:col-span-1">
            <div className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="Calendar Icon for Return Date"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <DatePicker
                selected={carSearchFormState.dropOffDate}
                onChange={(date) => {
                  dispatch(dropOffDate(date));
                }}
                minDate={today}
                placeholderText="DropOff Date"
                className="w-full gap-3 border-none focus:border-transparent focus:outline-none"
                wrapperClassName="flex-grow"
                popperClassName="z-10"
                required
              />
            </div>
          </div>

          {/* Input Field: DropOff Time */}
          <div id="drop-off-time-mobile" className="relative sm:col-span-2">
            <div
              className="flex items-center gap-3 rounded-md border-2 px-3 py-2"
              onClick={() => {}}
            >
              <Image
                src="/assets/icons/clock-icon.svg"
                alt="Clock Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />
              <DatePicker
                selected={carSearchFormState.dropOffTime ? new Date(carSearchFormState.dropOffTime) : null}
                onChange={(date) => dispatch(dropOffTime(date))}
                placeholderText="DropOff Time"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Cars Button Starts */}
      <button
        type="submit"
        className="mr-3 mt-12 flex w-full items-center justify-center gap-[10px] rounded-lg bg-darkBlue py-3 text-white"
      >
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={14}
          height={14}
        />
        Search Cars
      </button>
      {/* Search Cars Button Ends */}
    </form>
  );
};

export default CarsSearchFormMobile;
