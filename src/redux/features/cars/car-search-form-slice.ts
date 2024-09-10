"use client";

import { createSlice } from "@reduxjs/toolkit";

interface ICarSearchForm {
  location: {
    name: string;
    code: string;
  };
  pickUpDate: Date | null;
  pickUpTime: string;
  dropOffDate: Date | null;
  dropOffTime: string;
}

const carSearchFormInitialState: ICarSearchForm = {
  location: { name: "", code: "" },
  pickUpDate: null,
  pickUpTime: "",
  dropOffDate: null,
  dropOffTime: "",
};

const carSearchFormSlice = createSlice({
  name: "car-search-form",
  initialState: carSearchFormInitialState,
  reducers: {
    location: (state, action) => {
      state.location.name = action.payload.name;
      state.location.code = action.payload.code;
    },
    pickUpDate: (state, action) => {
      state.pickUpDate = action.payload;
    },
    pickUpTime: (state, action) => {
      state.pickUpTime = action.payload;
    },
    dropOffDate: (state, action) => {
      state.dropOffDate = action.payload;
    },
    dropOffTime: (state, action) => {
      state.dropOffTime = action.payload;
    },
  },
});

export const { location, pickUpDate, pickUpTime, dropOffDate, dropOffTime } =
  carSearchFormSlice.actions;

export default carSearchFormSlice.reducer;
