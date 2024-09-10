import React from "react";
import HeroMobile from "@/components/hero-mobile";
import InfoSection from "@/components/info-section";
import FeaturedSection from "@/sections/featured-sections/featured-section";
import PolicySection from "@/sections/policy-section";
import SubscribeSection from "@/sections/subscribe-section/subscribe-section";
import {
  carImages,
  hotelImages,
  destinationImages,
} from "@/data/featured-sections/images-path";
import HeroDesktop from "@/components/hero/hero-desktop";

const HotelsPage = () => {
  return (
    <>
      <div className="block lg:hidden">
        <HeroMobile />
      </div>

      <div className="hidden lg:block">
        <HeroDesktop />
      </div>
      <InfoSection />
      <FeaturedSection title="Top Featured Hotels" images={hotelImages} />

      <FeaturedSection title="Top Featured Cars" images={carImages} />
      <FeaturedSection
        title="Top Flight Destinations"
        images={destinationImages}
      />
      <PolicySection />
      <SubscribeSection title="Subscribe to see Secret Deals" />
    </>
  );
};

export default HotelsPage;
