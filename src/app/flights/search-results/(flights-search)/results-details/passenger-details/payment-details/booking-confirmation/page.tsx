import React from "react";
import FlightsSearchBookingConfirmationMain from "@/components/search-results/flights-search/booking-confirmation/booking-confirmation-main";

const FlightsSearchBookingConfirmation = () => {
  const baseFare = 4570;
  const serviceFeesAndTaxes = 2800;
  const insurance = 170;
  return (
    <section>
      <div className="container mx-auto my-8 rounded-lg">
        <div className="mt-6">
          <FlightsSearchBookingConfirmationMain
            baseFare={baseFare}
            serviceFeesAndTaxes={serviceFeesAndTaxes}
            insurance={insurance}
          />
        </div>
      </div>
    </section>
  );
};

export default FlightsSearchBookingConfirmation;
