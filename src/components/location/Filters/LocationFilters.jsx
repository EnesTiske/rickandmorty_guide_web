import React from 'react';
import Input from '../../shared/Input';
import './LocationFilters.css';

const LocationFilters = ({ filters, setFilters }) => {
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
        <div>
          <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
            Konum Ara
          </label>
          <Input
            type="text"
            name="search"
            placeholder="Konum ara..."
            value={filters.search}
            onChange={handleInputChange}
            className="filters-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
            Tip
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="filters-select"
          >
            <option value="">Tümü</option>
            <option value="Planet">Gezegen</option>
            <option value="Space station">Uzay İstasyonu</option>
            <option value="Microverse">Mikro Evren</option>
            <option value="TV">TV</option>
            <option value="Resort">Tatil Yeri</option>
            <option value="Fantasy town">Fantastik Şehir</option>
            <option value="Dream">Rüya</option>
            <option value="Dimension">Boyut</option>
            <option value="unknown">Bilinmeyen</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-filter-light-label dark:text-filter-dark-label mb-1">
            Boyut
          </label>
          <select
            name="dimension"
            value={filters.dimension}
            onChange={handleInputChange}
            className="filters-select"
          >
            <option value="">Tümü</option>
            <option value="Dimension C-137">Dimension C-137</option>
            <option value="unknown">Bilinmeyen</option>
            <option value="Post-Apocalyptic Dimension">Kıyamet Sonrası Boyut</option>
            <option value="Replacement Dimension">Yedek Boyut</option>
            <option value="Cronenberg Dimension">Cronenberg Boyutu</option>
            <option value="Fantasy Dimension">Fantastik Boyut</option>
            <option value="Dimension 5-126">Dimension 5-126</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LocationFilters; 