import React from 'react';
import TableRow from '../../shared/Table/TableRow';
import './LocationTable.css';

const LocationTableRow = ({ location, onClick, rowRef }) => {
  const customCells = {
    id: () => (
      <span className="location-table-id">{location.id}</span>
    ),
    name: () => (
      <span className="location-table-name">{location.name}</span>
    ),
    type: () => (
      <span className="location-table-type">{location.type}</span>
    ),
    dimension: () => (
      <span className="location-table-dimension">{location.dimension}</span>
    ),
    residents: () => (
      <span className="location-table-residents">{location.residents.length}</span>
    )
  };

  return (
    <TableRow
      data={location}
      columns={[
        { id: 'id', className: 'location-table-square-cell location-table-id-cell' },
        { id: 'name', className: 'location-table-name-cell' },
        { id: 'type', className: 'location-table-info-cell' },
        { id: 'dimension', className: 'location-table-info-cell' },
        { id: 'residents', className: 'location-table-info-cell' }
      ]}
      onClick={onClick}
      rowRef={rowRef}
      className="location-table-row"
      cellClassName="location-table-cell"
      customCells={customCells}
      baseRowClassName="location-table-row"
      baseCellClassName="location-table-cell"
      hoverClassName="location-table-row-hover"
      activeClassName="location-table-row-active"
    />
  );
};

export default LocationTableRow; 