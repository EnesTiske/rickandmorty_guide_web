import React from 'react';

const Spinner = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner; 