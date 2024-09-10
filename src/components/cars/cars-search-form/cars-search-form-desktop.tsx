import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
// import { useRouter } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from 'next/router';

import {
  location,
  pickUpDate,
  pickUpTime,
  dropOffDate,
  dropOffTime,
} from "@/redux/features/cars/car-search-form-slice";



import "react-datepicker/dist/react-datepicker.css";
import "./cars-search-form-desktop.css";




const CarsSearchFormDesktop = () => {
  const carSearchFormState = useAppSelector(
    (state: RootState) => state.carSearchForm,
  );
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentPath = usePathname();
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (suggestion) => {
    dispatch(location({ name: suggestion.display_name, code: suggestion.place_id }));
    setInputValue(suggestion.display_name);
    setSuggestions([]);
  };

    const handleSubmit = (e) => {
      e.preventDefault();
    
      router.push("/flights/search-results/car-search");
    };
    


  return (
    <section className="rounded-[10px] bg-white p-8">
      <form id="cars-search-form-desktop" onSubmit={handleSubmit}>
        <div id="cars-search-form-inputs-desktop" className="relative mt-8">
          <div className="flex gap-3">
            <div className="flex-grow">
              <div className={`flex h-12 items-center gap-3 rounded border py-2 pl-3`}>
                <div className="flex items-center">
                  <Image
                    src="/assets/icons/location-icon.svg"
                    alt="Location Icon"
                    width={16}
                    height={16}
                    className="h-[16px] w-[16px]"
                  />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="ml-2 w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[14px]"
                    placeholder="Select Location"
                    autoComplete="off"
                    required
                  />
                </div>
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white shadow-lg rounded mt-2 w-full max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        onClick={() => handleSelectLocation(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* PickUp Date Input Field */}
            <div className="relative flex-grow">
              <div
                className={`flex h-12 items-center gap-3 rounded border py-2 pl-3`}
                onClick={() => setShowCalendar(true)}
              >
                <Image
                  src="/assets/icons/calendar-icon.svg"
                  alt="Calendar Icon"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                
                <DatePicker
                  selected={carSearchFormState.pickUpDate}
                  onChange={(date) => {
                    dispatch(pickUpDate(date));
                  }}
                  dateFormat="yyyy/MM/dd"
                  minDate={today}
                  monthsShown={2}
                  onClickOutside={handleCalendarClose}
                  placeholderText="PickUp Date"
                  calendarClassName="custom-calendar"
                  className="w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[14px]"
                  required
                />
              </div>
            </div>

            {/* PickUp Time Input Field */}
            <div className="flex-grow">
              <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
                <Image
                  src="/assets/icons/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <DatePicker
                  selected={carSearchFormState.pickUpTime}
                  onChange={(time) => {
                    dispatch(pickUpTime(time));
                  }}
                  placeholderText="PickUp Time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[18px]"
                />
              </div>
            </div>

            {/* DropOff Date Input Field */}
            <div className="flex-grow">
              <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
                <Image
                  src="/assets/icons/calendar-icon.svg"
                  alt="Calendar Icon"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <DatePicker
                  selected={carSearchFormState.dropOffDate}
                  onChange={(date) => {
                    dispatch(dropOffDate(date));
                  }}
                  dateFormat="yyyy/MM/dd"
                  minDate={today}
                  placeholderText="DropOff Date"
                  monthsShown={2}
                  calendarClassName="custom-calendar"
                  className="w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[14px]"
                  required
                />
              </div>
            </div>

            {/* DropOff Time Input Field */}
            <div className="flex-grow">
              <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
                <Image
                  src="/assets/icons/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <DatePicker
                  selected={carSearchFormState.dropOffTime}
                  onChange={(date) => dispatch(dropOffTime(date))}
                  placeholderText="DropOff Time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[14px]"
                />
              </div>
            </div>

            {/* Desktop Search Button */}
            <div className="flex h-12 w-full min-w-[110px] items-center justify-center rounded-[4px] bg-darkBlue px-4 py-2 text-[16px] font-[600] text-white sm:w-[10%]">
              <button type="submit" className={`flex items-center gap-[6px]`}>
                <Image
                  src="/assets/icons/search-icon.svg"
                  alt="Search Icon"
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
    </section>
  );
};

export default CarsSearchFormDesktop;
