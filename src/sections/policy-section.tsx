import Image from "next/image";
import React from "react";

const PolicySection = () => {
  return (
    <section className="mt-[112px] flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {/* card 1 */}
        <div className="flex h-[230px] flex-col items-center justify-center rounded-lg bg-cardBackground p-10 text-center sm:h-[300px] sm:p-12">
          <Image
            src={"/assets/icons/callicon.svg"}
            alt="group"
            width={40}
            height={37}
            className="mb-5 sm:h-[64px] sm:w-[64px]"
          />
          <h2 className="mb-1 overflow-hidden whitespace-nowrap text-[18px] font-semibold sm:mb-2 sm:text-[22px]">
            Need Help? Contact Us
          </h2>
          <p className="max-w-[280px] text-[16px] font-normal text-[#777777] sm:max-w-[320px] sm:text-[18px]">
            Our support team available 24/7
          </p>
        </div>
        {/* card 2 */}
        <div className="flex h-[230px] flex-col items-center justify-center rounded-lg bg-cardBackground p-4 text-center sm:h-[300px] sm:p-6">
          <Image
            src="/assets/icons/lockicon.svg"
            alt="group"
            width={40}
            height={40}
            className="mb-5 sm:h-[64px] sm:w-[64px]"
          />
          <h2 className="mb-1 overflow-hidden whitespace-nowrap text-[18px] font-semibold sm:mb-2 sm:text-[22px]">
            Secure Payments
          </h2>
          <p className="max-w-[280px] text-[16px] font-normal text-[#777777] sm:max-w-[300px] sm:text-[18px]">
            Remarkable and 99.9% service uptime
          </p>
        </div>

        {/* card 3 */}
        <div className="mx-auto flex h-[230px] flex-col items-center justify-center rounded-lg bg-cardBackground p-10 text-center sm:col-span-2 sm:h-[300px] sm:max-w-md sm:p-16 md:col-span-2 md:max-w-md lg:col-span-1 lg:p-14">
          <Image
            src="/assets/icons/cancelicon.svg"
            alt="group"
            width={40}
            height={44}
            className="mb-5 sm:h-[64px] sm:w-[64px]"
          />
          <h2 className="mx-auto mb-1 text-[18px]  font-semibold sm:mb-2 sm:text-[22px]">
            Cancel Policy
          </h2>
          <p className="max-w-[280px] text-[16px] font-normal text-[#777777] sm:max-w-[300px] sm:text-[18px]">
            Cancellation made easy and automated
          </p>
        </div>
      </div>
    </section>
  );
};

export default PolicySection;
