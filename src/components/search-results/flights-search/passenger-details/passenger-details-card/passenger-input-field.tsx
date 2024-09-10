// components/InputField.tsx
import React from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface PassengerInputFieldProps {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
}

const PassengerInputField: React.FC<PassengerInputFieldProps> = ({
  label,
  error,
  registration,
  type = "text",
  placeholder,
}) => {
  return (
    <div>
      <div className="mt-6 flex items-center space-x-2">
        <div className=" h-5 w-5 rounded-full bg-lightBlue text-white">
          <p className="text-center text-sm font-medium">i</p>
        </div>
        <label className=" block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      <input
        required
        {...registration}
        type={type}
        placeholder={placeholder}
        className={clsx(
          "mt-2 block w-full rounded-md border border-gray-300 p-2 shadow-sm placeholder:text-sm placeholder:text-gray-400",
          {
            "border-red-500": error,
          },
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PassengerInputField;
