import React, { useState, useEffect } from 'react';
import { useCharacterContext } from '../../../contexts/CharacterContext';
import { STATUS_OPTIONS, GENDER_OPTIONS, ITEMS_PER_PAGE_OPTIONS } from '../../../utils/constants';
import Input from '../../shared/Input';
import Drawer from '../../shared/Filters/Drawer';
import { handleInputChange, handleMultiSelectChange, handleItemsPerPageChange } from '../../shared/Filters/filterHandlers';
import './Filters.css';

const CharacterFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    filters,
    setFilters,
    debouncedSearch,
    itemsPerPage,
    setItemsPerPage,
    setCurrentPage
  } = useCharacterContext();

  const inputChange = handleInputChange(setFilters);
  const multiSelectChange = (e, filterName) => {
    console.log('MultiSelect değişikliği:', e.target.value, e.target.checked, filterName); // Debug için
    console.log('Mevcut filtreler:', filters); // Debug için
    handleMultiSelectChange(setFilters)(e, filterName);
  };
  const itemsPerPageChange = handleItemsPerPageChange(setItemsPerPage, setCurrentPage);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="filters-toggle-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-current">Filtreler</span>
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
                Karakter Ara
              </label>
              <Input
                type="text"
                name="search"
                placeholder="Karakter ara..."
                value={filters.search}
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
                Durum
              </label>
              <div className="filters-multiselect">
                {STATUS_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={Array.isArray(filters.status) && filters.status.includes(option.value)}
                      onChange={(e) => multiSelectChange(e, 'status')}
                      className="filters-checkbox"
                    />
                    <span className="text-filter-light-text dark:text-filter-dark-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
                Cinsiyet
              </label>
              <div className="filters-multiselect">
                {GENDER_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={Array.isArray(filters.gender) && filters.gender.includes(option.value)}
                      onChange={(e) => multiSelectChange(e, 'gender')}
                      className="filters-checkbox"
                    />
                    <span className="text-filter-light-text dark:text-filter-dark-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
                Tür
              </label>
              <div className="filters-multiselect">
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Human"
                    checked={Array.isArray(filters.species) && filters.species.includes('Human')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">İnsan</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Alien"
                    checked={Array.isArray(filters.species) && filters.species.includes('Alien')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Uzaylı</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Humanoid"
                    checked={Array.isArray(filters.species) && filters.species.includes('Humanoid')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Humanoid</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Mythological Creature"
                    checked={Array.isArray(filters.species) && filters.species.includes('Mythological Creature')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Mitolojik Yaratık</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Animal"
                    checked={Array.isArray(filters.species) && filters.species.includes('Animal')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Hayvan</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Robot"
                    checked={Array.isArray(filters.species) && filters.species.includes('Robot')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Robot</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Cronenberg"
                    checked={Array.isArray(filters.species) && filters.species.includes('Cronenberg')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Cronenberg</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="Disease"
                    checked={Array.isArray(filters.species) && filters.species.includes('Disease')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Hastalık</span>
                </label>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value="unknown"
                    checked={Array.isArray(filters.species) && filters.species.includes('unknown')}
                    onChange={(e) => multiSelectChange(e, 'species')}
                    className="filters-checkbox"
                  />
                  <span className="text-filter-light-text dark:text-filter-dark-text">Bilinmiyor</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CharacterFilters; 