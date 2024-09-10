import React from "react";

interface HeroHeadingProps {
  text: string;
}

const HeroHeading = ({ text }: HeroHeadingProps) => {
  return (
    <h1 className="lg:text-heroHeadingDesktop md:text-heroHeadingTablet text-heroHeadingMobile font-bold lg:text-white text-lightBlue">
      {text}
    </h1>
  );
};

export default HeroHeading;
