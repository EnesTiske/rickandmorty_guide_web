import React, { useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLocationContext } from '../../../contexts/LocationContext';
import { LOCATION_COLUMNS } from '../../../utils/constants';
import { getSortIcon } from '../../../utils/helpers';
import Table from '../../shared/Table/Table';
import LocationTableRow from './LocationTableRow';
import LocationDetails from '../Details/LocationDetails';
import LocationFilters from '../Filters/LocationFilters';
import PaginationButton from '../../Pagination/PaginationButton';
import './LocationTable.css';

const LocationTable = () => {
  const { 
    locations, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    sortConfig,
    requestSort
  } = useLocationContext();
  const { isDarkMode } = useTheme();
  const { openDetails } = useLocationContext();
  const rowRefs = useRef([]);

  const columns = LOCATION_COLUMNS.map(column => ({
    ...column,
    renderSortIcon: getSortIcon,
    className: column.id === 'id' 
      ? 'location-table-id-cell location-table-square-cell'
      : column.id === 'name'
      ? 'location-table-name-cell'
      : 'location-table-info-cell'
  }));

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
      <LocationFilters />
      <Table
        columns={columns}
        data={locations}
        onRowClick={openDetails}
        sortConfig={sortConfig}
        onSort={requestSort}
        rowRefs={rowRefs.current}
        loading={loading}
        error={error}
        emptyMessage="Konum bulunamadı."
        renderRow={renderLocationRow}
        className="location-table-container"
        headerClassName="location-table-header"
        rowClassName="location-table-row"
        cellClassName="location-table-cell"
        customFooter={
          <PaginationButton 
            rowRefs={rowRefs} 
            characterCount={locations.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            loading={loading}
          />
        }
      />
      <LocationDetails />
    </>
  );
};

export default LocationTable; 