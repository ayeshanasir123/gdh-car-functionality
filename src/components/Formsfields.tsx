import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormFieldProps {
  imageSrc: string;
  placeholderText: string;
  hasEndIcon?: boolean;
  endIconSrc?: string;
  inputType?: "text" | "date";
  selectedDate?: string | null;
  onDateChange?: (date: string) => void;
  onEndIconClick?: () => void;
  showDropdown?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  imageSrc,
  placeholderText,
  hasEndIcon = false,
  endIconSrc = "",
  inputType = "text",
  selectedDate = null,
  onDateChange = () => {},
  onEndIconClick = () => {},
  showDropdown = false,
  onClick = () => {},
  style = {},
  required = false,
}) => {
  return (
    <div className="relative">
      <div
        className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2"
        onClick={onClick}
        style={style}
      >
        <Image
          src={imageSrc}
          alt="icon"
          height={16}
          width={16}
          className="w-[16px] h-[16px]"
        />
        {inputType === "date" ? (
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            placeholderText={placeholderText}
            className="w-full gap-3 border-none focus:border-transparent focus:outline-none"
            wrapperClassName="flex-grow"
            popperClassName="z-10"
            required={required}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholderText}
            className="flex-grow border-none focus:border-transparent focus:outline-none"
            required={required}
          />
        )}
        {hasEndIcon && endIconSrc && (
          <Image
            src={endIconSrc}
            alt="end icon"
            height={10}
            width={10}
            className={`w-[10px] h-[10px] cursor-pointer transition-transform ${
              showDropdown ? "rotate-180" : "rotate-0"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onEndIconClick();
            }}
          />
        )}
      </div>
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full border border-none bg-white">
          {/* The dropdown options will be rendered here by the parent component */}
        </div>
      )}
    </div>
  );
};

export default FormField;
