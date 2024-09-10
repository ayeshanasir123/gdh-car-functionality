import React from "react";
import Image from "next/image";
import { baggageData } from "@/data/flights/search-results/baggage-data";
import DetailsTitle from "./results-details-card/details-title";
import IndividualBaggageDetails from "./results-details-card/individual-baggage-details";

const BaggageDetails = () => {
  return (
    <div className="mt-4 rounded-lg border">
      <div className="px-6 py-6">
        <div className="flex flex-row">
          <Image
            width={50}
            height={50}
            alt="currency"
            src="/assets/icons/flights/search-results/search-result-details/briefcase.svg"
          />
          <div className="mx-4 mt-2">
            <DetailsTitle text="Baggage Information (Per person)" />
          </div>
        </div>
        <div className="flex flex-col">
          {baggageData.map((baggageItem, index) => {
            const isLastItem = index === baggageData.length - 1;
            return (
              <div key={baggageItem.id} className="mt-4 py-2 md:px-14">
                <div className="flex w-full flex-col md:flex-row">
                  <p className="ml-2 mr-1 text-sm  font-bold md:text-base">
                    Departure Flight
                  </p>
                  <div className="flex">
                    <p className="ml-2 mr-1 text-sm font-bold md:text-base">
                      {baggageItem.departure}{" "}
                    </p>
                    <Image
                      style={{
                        width: "15px",
                        height: "15px",
                        marginTop: "3px",
                      }}
                      width={15}
                      height={15}
                      alt="arrow"
                      src="/assets/icons/arrow-right.svg"
                    />
                    <p className="ml-1 text-sm font-bold  md:text-base">
                      {baggageItem.arrival}
                    </p>
                  </div>
                </div>
                <p className="mx-2">
                  {baggageItem.airlineName} | {baggageItem.cabinType} |{" "}
                  {baggageItem.brand}
                </p>
                <div className="mb-6 mt-4 grid grid-cols-1 items-center md:grid-cols-2 xl:grid-cols-3">
                  <IndividualBaggageDetails
                    text={baggageItem.personal}
                    itemImage={baggageItem.personalItemImage}
                    itemType={baggageItem.itemType}
                    iconImage={baggageItem.iconImage}
                    includedText="included"
                  />
                  <IndividualBaggageDetails
                    text={baggageItem.carryOn}
                    itemImage={baggageItem.baggageImage}
                    itemType={baggageItem.carryOnBag}
                    iconImage={baggageItem.iconImage}
                    includedText="included"
                  />
                  <IndividualBaggageDetails
                    text={baggageItem.checkedBag}
                    itemImage={baggageItem.baggageImage}
                    itemType={baggageItem.checkIn}
                    iconImage={baggageItem.iconImage}
                    includedText="included"
                  />
                </div>
                {!isLastItem && <hr />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BaggageDetails;
