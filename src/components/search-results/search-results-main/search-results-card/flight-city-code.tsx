import React from "react";

interface FlightCityCodeProps {
  text: string;
}

const FlightCityCode = ({ text }: FlightCityCodeProps) => {
  return <p className="font-semibold text-[#64748B]">{text}</p>;
};

export default FlightCityCode;
