// components/InputField.tsx
import React from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  registration,
  type = "text",
  placeholder,
}) => {
  return (
    <div>
      <label className="mt-4 block text-sm font-bold text-gray-700">
        {label}
      </label>
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

export default InputField;
