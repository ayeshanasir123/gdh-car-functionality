import HeroHeading from "@/components/headings/hero-heading";
import React from "react";

const HeroSection = () => {
  return (
    <main>
      <HeroHeading text="Let’s Book your next trip!" />
      <p className="font-[500] md:text-[32px] text-regular">
        Choose best deals over 1.5 million travel services
      </p>
    </main>
  );
};

export default HeroSection;
