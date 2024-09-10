export type FlightDate = Date | string | null;

export interface IFlightSearchForm {
  flyingFrom: {
    name: string;
    code: string;
  };

  destinationTo: {
    name: string;
    code: string;
  };

  flightDepartureDate: FlightDate;

  returnDate: FlightDate;

  flightReturnDate?: [FlightDate, FlightDate];

  flightType: string;

  flightClass: {
    name: string;
    code: string;
  };

  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
}
