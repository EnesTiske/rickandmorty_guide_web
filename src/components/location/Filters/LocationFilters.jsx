import React, { useState, useEffect } from 'react';
import { useLocationContext } from '../../../contexts/LocationContext';
import { TYPE_OPTIONS, DIMENSION_OPTIONS, ITEMS_PER_PAGE_OPTIONS } from '../../../utils/constants';
import Input from '../../shared/Input';
import Drawer from '../../shared/Filters/Drawer';
import { handleInputChange, handleMultiSelectChange, handleItemsPerPageChange } from '../../shared/Filters/filterHandlers';
import './LocationFilters.css';

const LocationFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    filters,
    setFilters,
    itemsPerPage,
    setItemsPerPage,
    setCurrentPage
  } = useLocationContext();

  const inputChange = handleInputChange(setFilters);
  const multiSelectChange = handleMultiSelectChange(setFilters);
  const itemsPerPageChange = handleItemsPerPageChange(setItemsPerPage, setCurrentPage);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="filters-toggle-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Filtreler</span>
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filtreler"
      >
        <div className="filters-container">
          <div className="filters-grid">
            <div>
              <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
                Konum Ara
              </label>
              <Input
                type="text"
                name="search"
                placeholder="Konum ara..."
                value={filters?.search || ""}
                onChange={inputChange}
                className="filters-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
                Sayfa Başına Sonuç
              </label>
              <select
                value={itemsPerPage}
                onChange={itemsPerPageChange}
                className="filters-select"
              >
                {ITEMS_PER_PAGE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
                Tür
              </label>
              <div className="filters-multiselect">
                {TYPE_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={(filters?.type || []).includes(option.value)}
                      onChange={(e) => multiSelectChange(e, 'type')}
                      className="filters-checkbox"
                    />
                    <span className="text-filter-light-text dark:text-filter-dark-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
                Boyut
              </label>
              <div className="filters-multiselect">
                {DIMENSION_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={(filters?.dimension || []).includes(option.value)}
                      onChange={(e) => multiSelectChange(e, 'dimension')}
                      className="filters-checkbox"
                    />
                    <span className="text-filter-light-text dark:text-filter-dark-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default LocationFilters; 