import React from "react";

interface CabinPressureProps {
  text: string;
}

const CabinPressure = ({ text }: CabinPressureProps) => {
  return(
  <div className="bg-gray-300 px-2 py-1 w-28 rounded">
    <h4 className="font-semibold text-[14px] text-darkBlue text-center">{text}</h4>
  </div>
  );
};

export default CabinPressure;
