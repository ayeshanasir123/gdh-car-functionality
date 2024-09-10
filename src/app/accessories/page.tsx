import React from "react";
import HeroDesktop from "../../components/hero/hero-desktop";
import HeroMobile from "@/components/hero-mobile";

const AccessoriesPage = () => {
  return (
    <div>
      <div className="block lg:hidden">
        <HeroMobile />
      </div>

      <div className="hidden lg:block">
        <HeroDesktop />
      </div>
    </div>
  );
};

export default AccessoriesPage;
