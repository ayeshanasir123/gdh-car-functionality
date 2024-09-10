"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FlightAPIRequest {
  numAdult: number;
  numChild: number;
  numInfant: number;
  cabinType: string;
  tripType: string;
  legs: {
    origin: string;
    destination: string;
    departureDate: string;
  }[];
}

// const URL = `http://localhost:3000/`;
const URL = `http://144.24.228.18:3000/`;

export const flightApi = createApi({
  reducerPath: "flightApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),
  tagTypes: ["Flights"],
  endpoints: (builder) => ({
    getAvailableFlights: builder.mutation<any, FlightAPIRequest>({
      query: (body) => ({
        url: `getAvailableFlights`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Flights", id: "LIST" }],
    }),
  }),
});

export const { useGetAvailableFlightsMutation } = flightApi;
