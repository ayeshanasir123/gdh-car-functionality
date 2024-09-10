"use client";
import React, { Suspense } from "react";
import FlightsSearchResultsDetailsMain from "@/components/search-results/flights-search/results-details/results-details-main";

const FlightsSearchResultsDetails = () => {
  return (
    <section className="min-h-[70vh]">
      <div className="container mx-auto my-4 rounded-lg">
        <Suspense>
          <FlightsSearchResultsDetailsMain />
        </Suspense>
      </div>
    </section>
  );
};

export default FlightsSearchResultsDetails;
