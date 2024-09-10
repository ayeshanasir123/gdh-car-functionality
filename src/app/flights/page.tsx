import React from "react";
import MobileNavbar from "@/components/mobile-navbar";
import InfoSection from "@/components/info-section";
import FeaturedSection from "@/sections/featured-sections/featured-section";

import {
  carImages,
  destinationImages,
  hotelImages,
} from "@/data/featured-sections/images-path";

import PolicySection from "@/sections/policy-section";
import SubscribeSection from "@/sections/subscribe-section/subscribe-section";
import HeroMobile from "@/components/hero-mobile";
import HeroDesktop from "@/components/hero/hero-desktop";

const FlightsPage = () => {
  return (
    <div>
      <div className="block lg:hidden">
        <MobileNavbar />
        {/* Mobile Hero Section  */}
        <HeroMobile />
      </div>

      <div className="hidden lg:block">
        {/* Desktop Hero Section */}
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

export default FlightsPage;
