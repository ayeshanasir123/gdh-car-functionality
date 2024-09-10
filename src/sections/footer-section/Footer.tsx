import {
  companies,
  explore,
  internationalSites,
  services,
  support,
} from "@/data/footer-section/footer-data";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="w-full bg-[#222222]">
      <div className="mx-auto flex max-w-[1400px] flex-col px-4 py-10 lg:px-10">
        <div className="mx-auto flex w-[90%]  flex-col gap-10 lg:w-[85%] ">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-5 ">
              <h3 className="text-[16px] font-semibold text-white lg:text-[18px]">
                Company
              </h3>
              <div>
                {companies.map((company) => (
                  <Link key={company.label} href={company.href}>
                    <p className="mb-2 text-[14px] text-[#CDCDCD] hover:text-white md:text-[16px]  lg:mb-4">
                      {company.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <h3 className="text-[16px] font-semibold text-white lg:text-[18px]">
                Explore
              </h3>
              <div>
                {explore.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <p className="mb-2 text-[14px] text-[#CDCDCD] hover:text-white md:text-[16px]  lg:mb-4">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <h3 className="text-[16px] font-semibold text-white lg:text-[18px]">
                Support
              </h3>
              <div>
                {support.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <p className="mb-2 text-[14px] text-[#CDCDCD] hover:text-white md:text-[16px]  lg:mb-4">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <h3 className="text-[16px] font-semibold text-white lg:text-[18px]">
                Services
              </h3>
              <div>
                {services.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <p className="mb-2 text-[14px] text-[#CDCDCD] hover:text-white md:text-[16px]  lg:mb-4">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/*  */}
          <hr className="hidden w-[90%] border-t border-[#444444] lg:flex" />
          <div className="flex flex-col gap-10">
            <h3 className="text-[16px] font-semibold text-white lg:text-[18px]">
              Our international Sites
            </h3>
            <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2 lg:grid-cols-4">
              {internationalSites.map((item) => (
                <div
                  key={item.label}
                  className="mb-5 flex flex-row items-center gap-5"
                >
                  <Image
                    src={item.flag}
                    alt={item.label}
                    width={1000}
                    height={1000}
                    className="h-8 w-8"
                  />
                  <p className="cursor-pointer text-[14px] text-[#DDDDDD] hover:text-white lg:text-[15px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full pt-10 text-center">
            <p className="text-[14px] text-nonActive lg:text-[16px]">
              All rights are reserved by Getdirectholidays Group
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
