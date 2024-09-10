import Image from "next/image";
import React from "react";

const InfoSection = () => {
  return (
    <section
      className="my-8 flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-4"
      id="info-section"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="flex h-[230px] flex-col items-center justify-center rounded-lg bg-cardBackground p-4 text-center sm:h-[300px] sm:p-6">
          <Image
            src={"/assets/icons/group.svg"}
            alt="group"
            width={40}
            height={37}
            className="mb-5 sm:h-[64px] sm:w-[64px]"
          />
          <h2 className="mb-1 overflow-hidden whitespace-nowrap text-[18px] font-semibold sm:mb-2 sm:text-[22px]">
            You’ll never roam alone
          </h2>
          <p className="max-w-[280px] text-[16px] font-normal text-[#777777] sm:max-w-[320px] sm:text-[18px]">
            Find best travel services and book them instantly
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex h-[230px] flex-col items-center justify-center rounded-lg bg-cardBackground p-4 text-center sm:h-[300px] sm:p-6">
          <Image
            src="/assets/icons/vector1.svg"
            alt="group"
            width={40}
            height={40}
            className="mb-5 sm:h-[64px] sm:w-[64px]"
          />
          <h2 className="mb-1 overflow-hidden whitespace-nowrap text-[18px] font-semibold sm:mb-2 sm:text-[22px]">
            Travel to anytime, anywhere
          </h2>
          <p className="max-w-[280px] text-[16px] font-normal text-[#777777] sm:max-w-[300px] sm:text-[18px]">
            No limits or boundaries for your next destination
          </p>
        </div>

        {/* Card 3 */}
        <div className="mx-auto flex h-[230px] flex-col items-center justify-center rounded-lg bg-cardBackground p-4 text-center sm:col-span-2 sm:h-[300px] sm:max-w-md sm:p-6 md:col-span-2 md:max-w-md lg:col-span-1 lg:p-3">
          <Image
            src="/assets/icons/vector2.svg"
            alt="group"
            width={40}
            height={44}
            className="mb-5 sm:h-[64px] sm:w-[64px]"
          />
          <h2 className="mx-auto mb-1 text-[18px] font-semibold sm:mb-2 sm:text-[22px]">
            Ease of mind, search, filter and book
          </h2>
          <p className="max-w-[280px] text-[16px] font-normal text-[#777777] sm:max-w-[300px] sm:text-[18px]">
            No limits or boundaries for your next destination
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
