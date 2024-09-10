import React from "react";
import FlightDetails from "./booking-confirmation-card/flight-details";
import ProductDetails from "./booking-confirmation-card/product-details";

interface PaymentSummaryProps {
  baseFare: number;
  serviceFeesAndTaxes: number;
  insurance: number;
}

const FlightsSearchBookingConfirmationMain: React.FC<PaymentSummaryProps> = ({
  baseFare,
  serviceFeesAndTaxes,
  insurance,
}) => {
  const grandTotal = baseFare + serviceFeesAndTaxes + insurance;

  return (
    <div>
      <FlightDetails />
      <ProductDetails />
      <div className="grid md:grid-cols-2">
        <div></div>
        <div className="cols-span-1 self-end ">
          <div className="flex flex-col">
            <p className="text-lg tracking-wide text-subHeading ">
              Payment Summary
            </p>
            <div className="flex justify-between">
              <p className="text-md font-bold tracking-wide text-subHeading ">
                Base Fare
              </p>
              <p className="text-md font-bold tracking-wide text-subHeading ">
                Rs {baseFare}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-md font-bold tracking-wide text-subHeading ">
                Service Fees & Taxes
              </p>
              <p className="text-md font-bold tracking-wide text-subHeading ">
                Rs {serviceFeesAndTaxes}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-md font-bold tracking-wide text-subHeading ">
                Insurance{" "}
              </p>
              <p className="text-md font-bold tracking-wide text-subHeading ">
                Rs {insurance}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <p className="text-xl font-bold tracking-wide ">Grand Total</p>
              <p className="text-lg font-bold tracking-wide text-subHeading ">
                Rs {grandTotal}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <button className="rounded-lg bg-gray-300 px-16 py-4 text-lg font-bold">
          Back to explore
        </button>
      </div>
    </div>
  );
};

export default FlightsSearchBookingConfirmationMain;
