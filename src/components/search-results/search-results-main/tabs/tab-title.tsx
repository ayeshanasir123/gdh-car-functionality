import React from "react";

interface TabTitleProps {
  text: string;
}

const TabTitle = ({ text }: TabTitleProps) => {
  return (
    <h3 className="p-4 text-center text-[12px] font-semibold text-darkBlue md:text-[16px] lg:text-[20px]">
      {text}
    </h3>
  );
};

export default TabTitle;
