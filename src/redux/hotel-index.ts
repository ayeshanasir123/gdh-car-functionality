"use client";

import { configureStore } from "@reduxjs/toolkit";
import hotelSearchFormReducer from "./features/hotels/hotel-search-form-slice";

import { setupListeners } from "@reduxjs/toolkit/query";
import getAvailableFlightsReducer from "./features/flights/get-available-flights-slice";

export const makeStore = configureStore({
  reducer: {
    hotel: hotelSearchFormReducer,
    getAvailableFlights: getAvailableFlightsReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(flightApi.middleware),
});

setupListeners(makeStore.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
