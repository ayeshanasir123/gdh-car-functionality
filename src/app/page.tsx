import React from "react";
import {
  carImages,
  destinationImages,
  hotelImages,
} from "@/data/featured-sections/images-path";

import MobileNavbar from "@/components/mobile-navbar";
import HeroMobile from "@/components/hero-mobile";
import FeaturedSection from "@/sections/featured-sections/featured-section";
import PolicySection from "@/sections/policy-section";
import SubscribeSection from "@/sections/subscribe-section/subscribe-section";
import InfoSection from "@/sections/InfoSection";
import HeroDesktop from "@/components/hero/hero-desktop";

const Homepage = () => {
  return (
    <>
      <div className="block lg:hidden">
        <MobileNavbar />
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
    </>
  );
};

export default Homepage;
