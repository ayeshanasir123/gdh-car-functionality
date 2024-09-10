import React from "react";

interface DetailsTitleProps {
  text: string;
}

const DetailsTitle = ({ text }: DetailsTitleProps) => {
  return <h2 className="text-lg font-bold md:text-2xl">{text}</h2>;
};

export default DetailsTitle;
