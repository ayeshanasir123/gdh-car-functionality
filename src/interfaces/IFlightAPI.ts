// Define the types for the response structure
interface Airport {
  code: string;
  city: string;
  airport: string;
  country: string;
}

interface FlightLeg {
  origin: Airport;
  destination: Airport;
  departureDate: string;
}

interface PassengerCounts {
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
}

interface ProviderInfo {
  validatingCarrier: string;
  carrierName: string;
  currencyCode: string;
  provider: string;
  lastTicketDate: string;
}

interface PriceDetails {
  provider: ProviderInfo;
  adult: {
    totalFare: string;
    totalBaseFare: string;
    totalTaxes: string;
  };
  isRefundable: string;
  totalFare: string;
  totalBaseFare: string;
  totalTaxes: string;
}

interface SegmentInfo {
  cabin: string;
  className: string;
  flightNumber: string;
  departure: {
    code: string;
    city: string;
    airport: string;
    terminal: string;
    dateTime: string;
    dateAdjustment: number;
    departureDateTime: string;
  };
  arrival: {
    code: string;
    city: string;
    airport: string;
    terminal: string;
    dateTime: string;
    dateAdjustment: number;
    arrivalDateTime: string;
  };
  equipment: string;
  elapsedTime: string;
  duration: string;
  marketing: {
    code: string;
    flightNumber: string;
  };
  operating: {
    code: string;
    flightNumber: string;
  };
  smokingAllowed: string;
  specialMeal: string;
  mealCode: string;
  seatsAvailable: number;
  stopCount: number;
  bookingCode: string;
}

interface BaggageInfo {
  segments: {
    paxType: string;
    unit: string;
    weight: string;
    piece: string;
  }[];
}

interface FlightInfo {
  price: PriceDetails;
  baggages: BaggageInfo[];
  legs: {
    segment: SegmentInfo[];
    hiddenStops: any[]; // Adjust if there's a specific type for hiddenStops
    bookingKey: string;
    fareRuleKey: string;
  }[];
}

export interface FlightSearchResponse {
  success: boolean;
  message: string;
  data: {
    searchQuery: {
      tripType: string;
      cabin: string;
      cabinName: string;
      passengers: PassengerCounts;
      legs: FlightLeg[];
    };
    message: string;
    flights: FlightInfo[];
  };
}

export interface FlightSearchRequest {
  numAdult: number;
  numChild: number;
  numInfant: number;
  cabinType: string;
  tripType: string;
  legs: FlightLeg[];
}
