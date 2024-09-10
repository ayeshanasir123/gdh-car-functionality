import React from "react";
import Image from "next/image";

interface SeatDetailsProps {
  seatsAvailable: number;
}

const SeatDetails = ({ seatsAvailable }: SeatDetailsProps) => {
  return (
    <div className="mt-4 rounded-lg border">
      <div className="px-6 py-12">
        <h2 className="text-lg font-bold md:text-2xl">
          Seats Available: {seatsAvailable}
        </h2>

        <p className="mt-1">
          For this flight seat choice must be purchased through the airlines
        </p>
      </div>
    </div>
  );
};

export default SeatDetails;
