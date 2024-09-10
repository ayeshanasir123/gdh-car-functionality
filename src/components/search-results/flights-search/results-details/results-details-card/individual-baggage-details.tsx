import React from "react";
import Image from "next/image";
interface IndividualBaggageDetailProps {
  text: string;
  itemImage: string;
  itemType:string;
  iconImage:string;
  includedText:string;


}

const IndividualBaggageDetails = ({ text,itemImage,itemType,iconImage,includedText }: IndividualBaggageDetailProps) => {
  return(
    <div className="flex flex-row">
    <Image
       style={{ width: "20px", height: "20px" ,marginTop:'28px'}}
      width={20}
      height={20}
      alt="arrow"
      src={itemImage}
    />
    <div className="flex flex-col mx-4 ">
      <p className="mt-5 text-lg">{text}</p>
      <p className="text-gray-600 lg:text-left md:text-center">{itemType}</p>
      <div className="flex flex-row">
        <Image
       style={{ width: "20px", height: "20px" ,marginTop:'1px'}}

          width={20}
          height={20}
          alt="check"
          src={iconImage}
        />
        <p>{includedText}</p>
      </div>
    </div>
  </div>
  );
};

export default IndividualBaggageDetails;
