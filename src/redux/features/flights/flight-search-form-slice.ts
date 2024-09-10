"use client";

import {
  ECONOMY_FLIGHT_CLASS,
  ROUND_TRIP_FLIGHT_TYPE,
} from "@/constants/flights";
import { createSlice } from "@reduxjs/toolkit";
import { IFlightSearchForm } from "@/interfaces/flights/IFlightSearchForm";

const flightSearchFormInitialState: IFlightSearchForm = {
  flyingFrom: {
    name: "",
    code: "",
  },

  destinationTo: {
    name: "",
    code: "",
  },

  flightDepartureDate: null || "",

  returnDate: null || "",

  flightReturnDate: [null || "", null || ""],

  flightType: ROUND_TRIP_FLIGHT_TYPE,

  flightClass: { name: ECONOMY_FLIGHT_CLASS, code: "Y" },

  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
};

const flightSearchFormSlice = createSlice({
  name: "flight",
  initialState: flightSearchFormInitialState,
  reducers: {
    flyingFrom: (state, action) => {
      state.flyingFrom.name = action.payload.name;
      state.flyingFrom.code = action.payload.code;
    },

    destinationTo: (state, action) => {
      state.destinationTo.name = action.payload.name;
      state.destinationTo.code = action.payload.code;
    },

    flightDepartureDate: (state, action) => {
      state.flightDepartureDate = action.payload;
    },

    returnDate: (state, action) => {
      state.returnDate = action.payload;
    },

    flightReturnDate: (state, action) => {
      state.flightReturnDate = action.payload;
    },

    flightType: (state, action) => {
      state.flightType = action.payload;
    },

    flightClass: (state, action) => {
      if (state?.flightClass) {
        state.flightClass.name = action.payload.name;
        state.flightClass.code = action.payload.code;
      }
    },

    incrementAdults: (state) => {
      if (state?.passengers?.adults < 8) {
        state.passengers.adults = state.passengers.adults + 1;
      }
    },

    decrementAdults: (state) => {
      if (state.passengers.adults > 1) {
        state.passengers.adults = state.passengers.adults - 1;
      }
    },

    incrementChildren: (state) => {
      if (state.passengers.children < 8) {
        state.passengers.children = state.passengers.children + 1;
      }
    },

    decrementChildren: (state) => {
      if (state.passengers.children > 0) {
        state.passengers.children = state.passengers.children - 1;
      }
    },

    incrementInfants: (state) => {
      if (state.passengers.infants < 8) {
        state.passengers.infants = state.passengers.infants + 1;
      }
    },

    decrementInfants: (state) => {
      if (state.passengers.infants > 0) {
        state.passengers.infants = state.passengers.infants - 1;
      }
    },
  },
});

export const {
  flyingFrom,
  destinationTo,
  flightDepartureDate,
  returnDate,
  flightReturnDate,
  flightType,
  flightClass,
  incrementAdults,
  decrementAdults,
  incrementChildren,
  decrementChildren,
  incrementInfants,
  decrementInfants,
} = flightSearchFormSlice.actions;

export default flightSearchFormSlice.reducer;
