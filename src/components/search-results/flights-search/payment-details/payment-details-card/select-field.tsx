// components/ui/CustomSelect.tsx
import React from "react";
import Select from "react-select";
import { FieldError } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: FieldError | undefined;
  label: string;
}

const selectFieldStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: "gray",
    minHeight: "2.5rem",
    marginTop: "8px",
  }),
  menu: (provided: any) => ({
    ...provided,
    maxHeight: "350px",
  }),
  option: (provided: any) => ({
    ...provided,
    height: "40px",
  }),
};

const SelectField: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
}) => {
  return (
    <div>
      <label className="mt-4 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <Select
        name={name}
        value={!!value ? { label: value, value: value } : null}
        onChange={(option) => onChange(option?.value || "")}
        options={options}
        styles={selectFieldStyles}
        classNamePrefix="react-select"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default SelectField;
