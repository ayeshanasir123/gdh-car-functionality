"use client";

import { createSlice } from "@reduxjs/toolkit";
import { IHotelSearchForm } from "@/interfaces/hotels/IHotelSeachForm";

const hotelSearchFormInitialState: IHotelSearchForm = {
  destination: {
    name: "",
  },
  checkInDate: null,
  checkOutDate: null,
  passengers: {
    adults: 1,
    children: 0,
    rooms: 0,
  },
};

const hotelSearchFormSlice = createSlice({
  name: "hotel",
  initialState: hotelSearchFormInitialState,
  reducers: {
    destination: (state, action) => {
      state.destination.name = action.payload.name;
    },
    checkInDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    checkOutDate: (state, action) => {
      state.checkOutDate = action.payload;
    },
    incrementAdults: (state) => {
      state.passengers.adults = state.passengers.adults + 1;
    },
    decrementAdults: (state) => {
      state.passengers.adults = state.passengers.adults - 1;
    },
    incrementChildren: (state) => {
      state.passengers.children = state.passengers.children + 1;
    },
    decrementChildren: (state) => {
      state.passengers.children = state.passengers.children - 1;
    },
    incrementRooms: (state) => {
      state.passengers.rooms = state.passengers.rooms + 1;
    },
    decrementRooms: (state) => {
      state.passengers.rooms = state.passengers.rooms - 1;
    },
  },
});

export const {
  destination,
  checkInDate,
  checkOutDate,
  incrementAdults,
  decrementAdults,
  incrementChildren,
  decrementChildren,
  incrementRooms,
  decrementRooms,
} = hotelSearchFormSlice.actions;

export default hotelSearchFormSlice.reducer;
