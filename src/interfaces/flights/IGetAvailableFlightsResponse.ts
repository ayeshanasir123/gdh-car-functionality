export interface IGetAvailableFlightsResponse {
  flights: Flight[];
  success: boolean;
  message: string;
}

interface Flight {
  price: Price;
  baggages: Baggage[];
  legs: Leg[];
}

interface Price {
  currency: string;
  totalFare: string;
  totalBaseFare: string;
  totalTaxes: string;
  provider: string;
  lastTicketDate: string;
  adult: {
    totalFare: string;
    totalBaseFare: string;
    totalTaxes: string;
  };
  isRefundable: string;
}

interface Baggage {
  segments: Segment[];
}

interface Segment {
  paxType: string;
  unit: string;
  weight: string;
  piece: string;
}

interface Leg {
  segment: LegSegment[];
  hiddenStops: any[];
  bookingKey: string;
  fareRuleKey: string;
}

interface LegSegment {
  cabin: string;
  className: string;
  flightNumber: string;
  departure: AirportDetails;
  arrival: AirportDetails;
  equipment: string;
  elapsedTime: string;
  duration: string;
  marketing: Airline;
  operating: Airline;
  smokingAllowed: string;
  specialMeal: string;
  mealCode: string;
  seatsAvailable: number;
  stopCount: number;
  bookingCode: string;
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

interface Airline {
  code: string;
  flightNumber: string;
}
