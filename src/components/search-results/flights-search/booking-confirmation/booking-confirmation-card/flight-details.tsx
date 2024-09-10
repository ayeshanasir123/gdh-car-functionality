import React from "react";
import { flightBookingDetails } from "@/data/flights/search-results/flights-bookingDetails";
import Image from "next/image";
import DetailsTitle from "../../results-details/results-details-card/details-title";

const FlightDetails = () => {
  return (
    <div className="container mx-auto rounded-lg border py-8">
      <DetailsTitle text="Flight Details" />
      {flightBookingDetails.map((flightBookingDetails, index) => {
        return (
          <div className="mt-12 grid md:grid-cols-3" key={index}>
            <p className="text-center font-bold text-subHeading md:text-left ">
              Invoice number: {flightBookingDetails.invoiceNumber}
            </p>
            <div className="mt-6 flex flex-col items-center md:mt-0">
              <p className="text-2xl font-bold uppercase tracking-wide text-lightBlue">
                Flight Booked
              </p>
              <p className="mt-6 text-center font-bold tracking-wider text-subHeading md:mt-0">
                ID {flightBookingDetails.flightID}
              </p>
              <p className="mt-6 text-center font-bold tracking-wider md:mt-0">
                {" "}
                {flightBookingDetails.day}, {flightBookingDetails.date}
              </p>
            </div>
            <p className="mt-6 text-center font-bold text-subHeading md:mt-0 md:text-left">
              Service Tax No: {flightBookingDetails.serviceTaxNo}
            </p>
            <div className="mt-6 flex flex-col items-center">
              <p className="text-xl text-subHeading ">
                {" "}
                {flightBookingDetails.airlineName}
              </p>
              <div className="mt-2 flex">
                <Image
                  style={{ width: "30px", height: "30px" }}
                  src="/assets/icons/airline-logo.svg"
                  alt="airline logo"
                  width={30}
                  height={30}
                />
                <p className="ml-2 text-xl font-bold">
                  {flightBookingDetails.flightNo}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <p className="text-xl text-subHeading">Cabin Class</p>
              <p className="text-2xl font-bold">
                {flightBookingDetails.cabinType}
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <p className="text-xl text-subHeading">seat</p>
              <p className="text-2xl font-bold">
                {flightBookingDetails.seatNo}
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <p className="text-xl text-subHeading ">
                {" "}
                {flightBookingDetails.departure}
              </p>

              <p className=" text-xl font-bold">
                {flightBookingDetails.departureCode}
              </p>
              <p className="text-xl font-bold">
                {flightBookingDetails.departureTime}
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <Image
                style={{ width: "30px", height: "30px" }}
                src="/assets/icons/plane-icon.svg"
                alt="airline logo"
                width={30}
                height={30}
              />

              <hr
                className="mt-2"
                style={{
                  height: "1px",
                  borderWidth: "1px",
                  width: "100px",
                  color: "gray",
                  backgroundColor: "gray",
                }}
              />
              <p className="text-lg text-subHeading">
                {flightBookingDetails.duration}
              </p>
              <p className="text-lg text-subHeading">
                {flightBookingDetails.flightType}
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <p className="text-xl text-subHeading ">
                {" "}
                {flightBookingDetails.destination}
              </p>

              <p className=" text-xl font-bold">
                {flightBookingDetails.destinationCode}
              </p>
              <p className="text-xl font-bold">
                {flightBookingDetails.arrivalTime}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightDetails;
