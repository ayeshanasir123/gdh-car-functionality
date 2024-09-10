import Image from "next/image";
import ImageTextBasicComponent from "./ImageTextBasicComponent";

const UniqueSellingPoint = () => {
  return (
    <div className="my-6">
      <div className="bg-[#0C1F3B] py-3 lg:flex md:grid-cols-2 md:pl-0 pl-3 md:grid md:px-5 justify-around text-white items-center font-[700] text-[16px]">
        {/* for great */}
        <div className="flex items-center gap-3 mb-3 lg:mb-0">
          <ImageTextBasicComponent
            img="/assets/icons/great-icon.svg"
            text="Great value deals"
            height={23}
            width={23}
            gap={3}
          />
        </div>
        {/* for booking */}
        <div className="flex items-center gap-3 mb-3 lg:mb-0">
          <ImageTextBasicComponent
            img="/assets/icons/booking-icon.svg"
            text="Book with confidence"
            height={23}
            width={23}
            gap={3}
          />
        </div>
        {/* for off */}
        <div className="flex items-center gap-3 mb-3 lg:mb-0">
          <ImageTextBasicComponent
            img="/assets/icons/plane-icon-solid.svg"
            text="0% Faff"
            height={23}
            width={23}
            gap={3}
          />
        </div>
        {/* for rating */}
        <div className="flex md:gap-2 gap-1 items-center mb-3 lg:mb-0">
          <Image
            src={"/assets/images/trustpilot-logo.svg"}
            alt="trust-logo"
            width={136}
            height={32}
            className="md:mr-3 mr-1 w-[136px] h-[32px]"
          />
          {[1, 2, 3, 4, 5].map((rating) => {
            return (
              <Image
                key={rating}
                src={"/assets/icons/rating-icon.svg"}
                alt="rating-icons"
                width={25}
                height={100}
                className="w-auto h-auto"
              />
            );
          })}

          <p className="text-[16px] font-[700] ml-1 md:ml-3">Great</p>
        </div>
      </div>
    </div>
  );
};

export default UniqueSellingPoint;
