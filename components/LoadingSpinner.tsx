
import React from 'react';

interface LoadingSpinnerProps {
  size?: string; // e.g., 'w-8 h-8'
  color?: string; // e.g., 'text-blue-500'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'w-8 h-8', color = 'text-sky-500' }) => {
  return (
    <div className={`animate-spin rounded-full border-4 border-t-transparent ${size} ${color}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
