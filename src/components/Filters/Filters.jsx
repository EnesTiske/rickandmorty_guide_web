import React from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import { STATUS_OPTIONS, GENDER_OPTIONS } from '../../utils/constants';
import Input from '../shared/Input';
import './Filters.css';

const Filters = () => {
  const {
    filters,
    setFilters,
    debouncedSearch
  } = useCharacterContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="filters-container">
      <div className="filters-grid">
        <Input
          type="text"
          name="search"
          placeholder="Karakter ara..."
          value={filters.search}
          onChange={handleInputChange}
          className="filters-input"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
          className="filters-select"
        >
          {STATUS_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          name="gender"
          value={filters.gender}
          onChange={handleInputChange}
          className="filters-select"
        >
          {GENDER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          name="species"
          value={filters.species}
          onChange={handleInputChange}
          className="filters-select"
        >
          <option value="">Tüm Türler</option>
          <option value="Human">İnsan</option>
          <option value="Alien">Uzaylı</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Mythological Creature">Mitolojik Yaratık</option>
          <option value="Animal">Hayvan</option>
          <option value="Robot">Robot</option>
          <option value="Cronenberg">Cronenberg</option>
          <option value="Disease">Hastalık</option>
          <option value="unknown">Bilinmiyor</option>
        </select>
      </div>
    </div>
  );
};

export default Filters; 