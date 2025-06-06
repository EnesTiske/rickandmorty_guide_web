import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  
  const variants = {
    primary: 'bg-primary-light dark:bg-primary-dark text-white hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 disabled:bg-primary-light/50 dark:disabled:bg-primary-dark/50',
    secondary: 'bg-secondary-light dark:bg-secondary-dark text-white hover:bg-secondary-light/80 dark:hover:bg-secondary-dark/80 disabled:bg-secondary-light/50 dark:disabled:bg-secondary-dark/50',
    danger: 'bg-danger-light dark:bg-danger-dark text-white hover:bg-danger-light/80 dark:hover:bg-danger-dark/80 disabled:bg-danger-light/50 dark:disabled:bg-danger-dark/50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 