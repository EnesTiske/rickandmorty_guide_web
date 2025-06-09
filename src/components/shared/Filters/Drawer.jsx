import React, { useEffect } from 'react';
import './Drawer.css';

const Drawer = ({ isOpen, onClose, title, children }) => {

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <div className="drawer-header">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="drawer-close-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>

      {isOpen && (
        <div
          className="drawer-overlay"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Drawer; 