"use client";
import React from "react";
import FormField from "./FormField";
import Button from "../forms/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  departureDate,
  destinationTo,
  returnDate,
  flyingFrom,
} from "@/redux/features/flights/flight-search-form-slice";

import DatePicker from "react-datepicker";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { IFlightSearchForm } from "@/interfaces/flights/IFlightSearchForm";

const Form = ({ tripType }: { tripType: string }) => {
  const router = useRouter();
  const flightState: IFlightSearchForm = useAppSelector(
    (state: RootState) => state.flight,
  );
  const dispatch = useAppDispatch();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/flights/search-results");
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <FormField
            type="text"
            name="flyingFrom"
            placeholder="Flying from"
            value={flightState.flyingFrom}
            onChange={(e) => dispatch(flyingFrom(e.target.value))}
            icon="/assets/icons/plane-take-off-icon.svg"
          />
          <FormField
            type="text"
            name="destinationTo"
            placeholder="Destination to"
            value={flightState.destinationTo}
            onChange={(e) => dispatch(destinationTo(e.target.value))}
            icon="/assets/icons/plane-landing-icon.svg"
          />

          {/* Input Field: Desktop Departure Date */}
          <div className="flex w-full flex-col sm:w-[30%]">
            <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
              <Image
                src="/assets/icons/calendar-icon.svg"
                alt="Departure Date Icon"
                width={16}
                height={16}
                className="h-auto w-auto"
              />

              <DatePicker
                selected={flightState.departureDate}
                onChange={(date) => dispatch(departureDate(date))}
                dateFormat="yyyy/MM/dd"
                placeholderText="Departure date"
                className="flex-grow bg-transparent outline-none placeholder:text-[16px]"
              />
            </div>
          </div>

          {/* Input Field: Desktop Return Date */}
          {tripType === "Round trip" && (
            <div className="flex w-full flex-col sm:w-[30%]">
              <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
                <Image
                  src="/assets/icons/calendar-icon.svg"
                  alt="Return Date Icon"
                  width={16}
                  height={16}
                  className="h-auto w-auto"
                />

                <DatePicker
                  selected={flightState.returnDate}
                  onChange={(date) => dispatch(returnDate(date))}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Return date"
                  className="flex-grow bg-transparent outline-none placeholder:text-[16px]"
                />
              </div>
            </div>
          )}
          <div className="flex h-12 w-full min-w-[110px] items-center justify-center rounded-[4px] bg-[#10294D] px-4 py-2 text-[16px] font-[600] text-white sm:w-[10%]">
            <Button img="/assets/icons/search-icon.svg" text="Search" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
