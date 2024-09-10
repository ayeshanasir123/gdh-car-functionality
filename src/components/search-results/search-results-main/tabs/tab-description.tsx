import React from "react";

interface TabDescriptionProps {
  text: string;
}

const TabDescription = ({ text }: TabDescriptionProps) => {
  return (
    <p className="md:mt-[4px] mt-[2px] font-medium lg:text-[14px] md:text-[12px] text-[10px] text-[#6B7280]">
      {text}
    </p>
  );
};

export default TabDescription;
