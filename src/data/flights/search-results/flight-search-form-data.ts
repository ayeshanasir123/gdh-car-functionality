import {
  ECONOMY_FLIGHT_CLASS,
  ROUND_TRIP_FLIGHT_TYPE,
} from "@/constants/flights";

export const flightSearchFormData = {
  flyingFrom: "Lahore",
  destinationTo: "Dubai",
  departureDate: "2024/07/12",
  returnDate: "2024/07/16",
  passengers: {
    adults: 2,
    children: 2,
    infants: 0,
  },
  flightType: ROUND_TRIP_FLIGHT_TYPE,
  flightClass: ECONOMY_FLIGHT_CLASS,
};
