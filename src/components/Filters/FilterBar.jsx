import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İsim
          </label>
          <input
            type="text"
            value={filters.name || ''}
            onChange={(e) => onFilterChange('name', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Karakter ismi..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durum
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Tümü</option>
            <option value="alive">Yaşıyor</option>
            <option value="dead">Ölü</option>
            <option value="unknown">Bilinmiyor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tür
          </label>
          <input
            type="text"
            value={filters.species || ''}
            onChange={(e) => onFilterChange('species', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Tür..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cinsiyet
          </label>
          <select
            value={filters.gender || ''}
            onChange={(e) => onFilterChange('gender', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Tümü</option>
            <option value="female">Kadın</option>
            <option value="male">Erkek</option>
            <option value="genderless">Cinsiyetsiz</option>
            <option value="unknown">Bilinmiyor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 