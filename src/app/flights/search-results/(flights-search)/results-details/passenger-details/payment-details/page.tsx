import React, { Suspense } from "react";
import FlightsSearchPaymentDetailsMain from "@/components/search-results/flights-search/payment-details/payment-details-main";

const FlightsSearchResultsDetails = () => {
  return (
    <section>
      <div className="container mx-auto my-8 rounded-lg">
        <Suspense>
          <FlightsSearchPaymentDetailsMain />
        </Suspense>
      </div>
    </section>
  );
};

export default FlightsSearchResultsDetails;
