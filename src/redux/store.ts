"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import flightSearchFormReducer from "./features/flights/flight-search-form-slice";
import carSearchFormReducer from "./features/cars/car-search-form-slice";
import accessoriesSearchFormReducer from "./features/accessories/accessories-search-form-slice";

import { flightApi } from "./services/flights/flight-api";
import getAvailableFlightsReducer from "./features/flights/get-available-flights-slice";
import hotelSearchFormReducer from "./features/hotels/hotel-search-form-slice";
import singleFlightDetailsReducer from "./features/flights/single-flight-details-slice";

export const makeStore = configureStore({
  reducer: {
    [flightApi.reducerPath]: flightApi.reducer,

    flight: flightSearchFormReducer,
    hotel: hotelSearchFormReducer,

    getAvailableFlights: getAvailableFlightsReducer,
    singeFlightDetails: singleFlightDetailsReducer,

    carSearchForm: carSearchFormReducer,
    accessoriesSearchForm: accessoriesSearchFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightApi.middleware),
});

setupListeners(makeStore.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
