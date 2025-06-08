import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Table from '../shared/Table/Table';
import LocationTableRow from './LocationTableRow';
import './LocationTable.css';

const LOCATION_COLUMNS = [
  { id: 'id', label: 'ID', sortable: true, className: 'location-table-id-cell' },
  { id: 'name', label: 'İsim', sortable: true, className: 'location-table-name-cell' },
  { id: 'type', label: 'Tip', sortable: true, className: 'location-table-info-cell' },
  { id: 'dimension', label: 'Boyut', sortable: true, className: 'location-table-info-cell' },
  { 
    id: 'residents', 
    label: 'Sakin Sayısı', 
    sortable: true, 
    className: 'location-table-info-cell',
    render: (location) => location.residents.length
  }
];

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const { isDarkMode } = useTheme();
  const rowRefs = useRef([]);

  useEffect(() => {
    fetchLocations();
  }, [page]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
      const data = await response.json();
      setLocations(data.results);
      setTotalPages(data.info.pages);
      setError(null);
    } catch (err) {
      setError('Konumlar yüklenirken bir hata oluştu.');
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedLocations = [...locations].sort((a, b) => {
      if (key === 'residents') {
        return direction === 'asc' 
          ? a.residents.length - b.residents.length
          : b.residents.length - a.residents.length;
      }
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setLocations(sortedLocations);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const columns = LOCATION_COLUMNS.map(column => ({
    ...column,
    renderSortIcon: () => getSortIcon(column.id)
  }));

  const renderLocationRow = (location, idx, rowRef) => (
    <LocationTableRow
      key={location.id}
      location={location}
      onClick={() => console.log('Selected location:', location)}
      rowRef={rowRef}
    />
  );

  return (
    <Table
      columns={columns}
      data={locations}
      onRowClick={(location) => console.log('Selected location:', location)}
      sortConfig={sortConfig}
      onSort={handleSort}
      rowRefs={rowRefs.current}
      loading={loading}
      error={error}
      emptyMessage="Konum bulunamadı."
      renderRow={renderLocationRow}
      className="location-table-container"
      headerClassName="location-table-header"
      rowClassName="location-table-row"
      cellClassName="location-table-cell"
    />
  );
};

export default LocationTable; 