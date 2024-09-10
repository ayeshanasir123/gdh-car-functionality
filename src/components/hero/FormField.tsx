import React from "react";
import Image from "next/image";
import Input from "../forms/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type FormFieldProps = {
  type: "text" | "date";
  name: string;
  placeholder: string;
  value: string | Date | null;
  onChange: (e: any) => void;
  error?: boolean;
  icon: string;
};

const FormField: React.FC<FormFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  icon,
}) => {
  return (
    <div className="flex w-full flex-col sm:w-[30%]">
      {error && <span className="text-red-500">Required</span>}
      <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
        <Image
          src={icon}
          alt={name}
          width={16}
          height={16}
          className="h-[16px] w-[16px]"
        />
        {type === "text" ? (
          <Input
            name={name}
            type="text"
            placeholder={placeholder}
            className="flex-grow bg-transparent outline-none placeholder:text-[16px]"
            value={value as string}
            onChange={onChange}
          />
        ) : (
          <DatePicker
            selected={value as Date}
            onChange={onChange}
            dateFormat="yyyy/MM/dd"
            placeholderText={placeholder}
            className="flex-grow bg-transparent outline-none placeholder:text-[16px]"
          />
        )}
      </div>
    </div>
  );
};

export default FormField;
