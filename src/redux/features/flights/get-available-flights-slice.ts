"use client";

import { createSlice } from "@reduxjs/toolkit";

import { IGetAvailableFlightsResponse } from "@/interfaces/flights/IGetAvailableFlightsResponse";

const getAvailableFlightsInitialState: IGetAvailableFlightsResponse = {
  flights: [],
  success: false,
  message: "",
};

const getAvailableFlightsSlice = createSlice({
  name: "getAvailableResponse",
  initialState: getAvailableFlightsInitialState,
  reducers: {
    setAvailableFlights: (state, action) => {
      state.flights = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setAvailableFlights, setSuccess, setMessage } =
  getAvailableFlightsSlice.actions;
export default getAvailableFlightsSlice.reducer;
