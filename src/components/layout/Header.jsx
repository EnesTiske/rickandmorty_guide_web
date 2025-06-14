import React, { forwardRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Header = forwardRef((props, ref) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header" ref={ref}>
      <div className="header-content">
        <Link to="/" className="header-logo">
          Rick & Morty Karakter Rehberi
        </Link>
        <div className="header-actions">
          <nav className="header-nav">
            <Link
              to="/character"
              className={`header-link transition-colors duration-200 ${isActive('/character') ? 'header-link-active' : ''}`}
            >
              Karakterler
            </Link>
            <Link
              to="/location"
              className={`header-link transition-colors duration-200 ${isActive('/location') ? 'header-link-active' : ''}`}
            >
              Konumlar
            </Link>
            <Link
              to="/episode"
              className={`header-link transition-colors duration-200 ${isActive('/episode') ? 'header-link-active' : ''}`}
            >
              Bölümler
            </Link>
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Tema değiştir"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header; 