import React from "react";

interface IInput {
  type: string;
  placeholder: string;
  name: string;
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, type, placeholder, className, value, onChange }: IInput) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
