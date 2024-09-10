// components/RadioButton.tsx
import React, { ChangeEvent } from 'react';

interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, value, label, checked, onChange }) => {
  return (
    <label className="flex items-center mb-2 mt-4 cursor-pointer">
      <input
      required
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <span className="font-semibold">{label}</span>
    </label>
  );
};

export default RadioButton;
