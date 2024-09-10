export interface IHotelSearchForm {
  destination: {
    name: string;
  };
  checkInDate: Date | null;
  checkOutDate?: Date | null;

  passengers: {
    adults: number;
    children: number;
    rooms: number;
  };
}
