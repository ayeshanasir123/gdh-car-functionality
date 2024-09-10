"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { flightClass } from "@/redux/features/flights/flight-search-form-slice";

type DropdownProps = {
  label: string;
  options: string[];
  selected: string;
  icon: string;
  onSelect: (option: string) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  icon,
  onSelect,
  isOpen,
  toggleDropdown,
}) => {
  const dispatch = useAppDispatch();
  const handleSelect = (option: string) => {
    onSelect(option);
    dispatch(flightClass(option));
    toggleDropdown();
  };

  return (
    <div className="relative flex cursor-pointer items-center gap-2 text-[14px] font-[500] text-[#10294D]">
      <div
        className="flex h-auto w-auto items-center gap-2"
        onClick={toggleDropdown}
      >
        <Image src={icon} alt={label} width={14} height={14} />
        <span>{selected}</span>
        <Image
          src="/assets/icons/drop-down-icon.svg"
          alt="drop-down-icon"
          height={4}
          width={8}
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""} h-auto w-auto`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 w-[224px] rounded-[6px] bg-white shadow-md">
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer px-5 py-2 text-[#374151] hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
