import Image from "next/image";
import React from "react";

interface IButton {
  text: string;
  img: string;
}

const Button = ({ text, img }: IButton) => {
  return (
    <button className={`flex gap-[6px] items-center`}>
      <Image
        src={img}
        alt="search icon"
        width={14}
        height={14}
        className="w-[14px] h-[14px]"
      />
      {text}
    </button>
  );
};

export default Button;
