import React from 'react';
import Button from './Button';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center py-4">
      <p className="text-red-600 mb-2">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="secondary"
          className="text-sm"
        >
          Tekrar Dene
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage; 