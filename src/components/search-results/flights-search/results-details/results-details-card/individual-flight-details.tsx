import React from "react";

interface IndividualFlightDetails {
  text: string;
}

const IndividualFlightDetails = ({ text }: IndividualFlightDetails) => {
  return(
   <p className='mt-1'>{text}</p>
  );
};

export default IndividualFlightDetails;
