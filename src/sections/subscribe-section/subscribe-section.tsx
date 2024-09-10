import Image from "next/image";
import SectionHeading from "./section-heading";
import Input from "./Input";

interface SubscribeSectionProps {
  title: string;
}

const SubscribeSection = ({ title }: SubscribeSectionProps) => {
  return (
    <section className="mx-auto min-h-[90vh] max-w-[1400px] px-4 py-10 lg:px-10 2xl:px-0">
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
        <div className="hidden w-full lg:flex">
          <Image
            src={"/assets/images/subscribe-section/subscribe-section-image.jpg"}
            alt="subscribe section image"
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-full">
          <SectionHeading title={title} />
          <h3 className="lg:[24px] mb-5 mt-2 text-[18px] text-subHeading sm:text-[20px] lg:mb-10">
            Your One Stop Shop
          </h3>
          <Input />
        </div>
        <div className="flex w-full lg:hidden">
          <Image
            src={"/assets/images/subscribe-section/subscribe-section-image.jpg"}
            alt="subscribe section image"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
