// Define the Flight type
export interface IFlightSearchResult {
  legs: Leg[];
  price?: any;
  baggages?: any;
}

interface Leg {
  segment: IFlightSearchResultSegment[];
}

export interface IFlightSearchResultSegment {
  cabin: string;
  className: string;
  flightNumber: string;
  departure: AirportDetails;
  arrival: AirportDetails;
  equipment: string;
  elapsedTime: string;
  duration: string;
  smokingAllowed: string;
  specialMeal: string;
  mealCode: string;
  seatsAvailable: number;
  stopCount: number;
  operating: {
    code: string;
    flightNumber: string;
  };
}

interface AirportDetails {
  code: string;
  city: string;
  airport: string;
  terminal: string;
  dateTime: string;
  dateAdjustment: number;
  departureDateTime?: string;
  arrivalDateTime?: string;
}
