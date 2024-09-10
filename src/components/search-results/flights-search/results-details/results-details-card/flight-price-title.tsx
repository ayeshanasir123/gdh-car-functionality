import React from "react";
import { number } from "zod";

interface FlightPriceTitleProps {
  text: string | number;
}

const FlightPriceTitle = ({ text }: FlightPriceTitleProps) => {
  return(
  
    <h3 className="text-md font-medium text-subHeading">{text} </h3>

  );
};

export default FlightPriceTitle;
