import React, { Suspense } from "react";
import PassengerDetailsFormMain from "@/components/search-results/flights-search/passenger-details/passenger-details-form-main";
import FlightSummary from "@/components/search-results/flights-search/payment-details/flight-summary";

const page = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PassengerDetailsFormMain />
        </div>
        <div className="rounded-lg border">
          <Suspense>
            <FlightSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
