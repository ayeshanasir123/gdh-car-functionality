import React from "react";
import HeroDesktop from "../../components/hero/hero-desktop";
import HeroMobile from "@/components/hero-mobile";
import InfoSection from "@/sections/InfoSection";
import FeaturedSection from "@/sections/featured-sections/featured-section";
import {
  carImages,
  destinationImages,
  hotelImages,
} from "@/data/featured-sections/images-path";
import PolicySection from "@/sections/policy-section";
import SubscribeSection from "@/sections/subscribe-section/subscribe-section";

const CarsPage = () => {
  return (
    <div>
      <div className="block lg:hidden">
        <HeroMobile />
      </div>

      <div className="hidden lg:block">
        <HeroDesktop />
      </div>
      <InfoSection />
      <FeaturedSection title="Top Featured Cars" images={carImages} />
      <FeaturedSection
        title="Top Flight Destinations"
        images={destinationImages}
      />
      <FeaturedSection title="Top Featured Hotels" images={hotelImages} />
      <PolicySection />
      <SubscribeSection title="Subscribe to see Secret Deals" />
    </div>
  );
};

export default CarsPage;
