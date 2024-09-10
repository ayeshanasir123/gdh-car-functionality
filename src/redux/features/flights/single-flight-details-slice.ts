"use client";

import { createSlice } from "@reduxjs/toolkit";

const singleFlightDetailsInitialState = {
  prices: {
    totalBaseFare: "",
    totalFare: "",
    totalTaxes: "",
  },
  singleFlight: {
    arrivalCityCode: "",
    arrivalTime: "",
    departureCityCode: "",
    departureTime: "",
    duration: "",
    flightClass: "",
    flightNumber: "",
    stopCount: 0,
  },
};

const singleFlightDetailsSlice = createSlice({
  name: "singleFlightDetails",
  initialState: singleFlightDetailsInitialState,
  reducers: {
    setPrices: (state, action) => {
      state.prices.totalBaseFare = action.payload.totalBaseFare;
      state.prices.totalTaxes = action.payload.totalTaxes;
      state.prices.totalFare = action.payload.totalFare;
    },
    setSingleFlight: (state, action) => {
      state.singleFlight.arrivalCityCode = action.payload.arrivalCityCode;
      state.singleFlight.arrivalTime = action.payload.arrivalTime;
      state.singleFlight.departureCityCode = action.payload.departureCityCode;
      state.singleFlight.departureTime = action.payload.departureTime;
      state.singleFlight.duration = action.payload.duration;
      state.singleFlight.flightClass = action.payload.flightClass;
      state.singleFlight.flightNumber = action.payload.flightNumber;
      state.singleFlight.stopCount = action.payload.stopCount;
    },
  },
});

export const { setPrices, setSingleFlight } = singleFlightDetailsSlice.actions;
export default singleFlightDetailsSlice.reducer;
