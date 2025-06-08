import React, { useState, useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLocationContext } from '../../../contexts/LocationContext';
import Table from '../../shared/Table/Table';
import LocationTableRow from './LocationTableRow';
import LocationDetails from '../Details/LocationDetails';
import LocationFilters from '../Filters/LocationFilters';
import { useLocations } from '../../../hooks/useLocations';
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
  const [filters, setFilters] = useState({ search: '', type: '', dimension: '' });
  const { locations, loading, error } = useLocations(filters);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const { isDarkMode } = useTheme();
  const { openDetails } = useLocationContext();
  const rowRefs = useRef([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const columns = LOCATION_COLUMNS.map(column => ({
    ...column,
    renderSortIcon: () => getSortIcon(column.id)
  }));

  const sortedLocations = React.useMemo(() => {
    if (!sortConfig.key) return locations;
    return [...locations].sort((a, b) => {
      if (sortConfig.key === 'residents') {
        return sortConfig.direction === 'asc'
          ? a.residents.length - b.residents.length
          : b.residents.length - a.residents.length;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [locations, sortConfig]);

  const renderLocationRow = (location, idx, rowRef) => (
    <LocationTableRow
      key={location.id}
      location={location}
      onClick={() => openDetails(location)}
      rowRef={rowRef}
    />
  );

  return (
    <>
      <LocationFilters filters={filters} setFilters={setFilters} />
      <Table
        columns={columns}
        data={sortedLocations}
        onRowClick={openDetails}
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
      <LocationDetails />
    </>
  );
};

export default LocationTable; 