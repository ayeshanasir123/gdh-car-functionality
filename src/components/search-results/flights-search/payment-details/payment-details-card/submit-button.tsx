// components/Button.tsx
import * as React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const SubmitButton: React.FC<ButtonProps> = ({ type = 'button', children, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(" mx-4 w-full mt-6 bg-lightBlue font-bold text-white py-2 px-4 rounded-lg hover:bg-darkBlue ", className)}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
