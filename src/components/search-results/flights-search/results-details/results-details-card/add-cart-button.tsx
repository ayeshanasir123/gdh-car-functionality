// components/Button.tsx
import * as React from 'react';
import clsx from 'clsx';

interface AddCartButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const AddCartButton: React.FC<AddCartButtonProps> = ({ type = 'button', children, onClick, className }) => {
  return (
    <button  type={type}
    onClick={onClick} className='mt-4 bg-darkBlue w-full text-white py-2 px-4 rounded-lg font-bold'>{children}</button>
  );
};

export default AddCartButton;