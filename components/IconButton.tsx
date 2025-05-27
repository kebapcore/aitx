
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // For accessibility
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, className = '', ...props }) => {
  return (
    <button
      type="button"
      aria-label={label}
      className={`p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-colors ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
