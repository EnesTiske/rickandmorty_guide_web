import React from 'react';
import './Table.css';

const Table = ({
  columns,
  data,
  onRowClick,
  sortConfig,
  onSort,
  rowRefs,
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
  loading,
  error,
  emptyMessage = 'Veri bulunamadı.',
  renderRow,
  customHeader,
  customFooter
}) => {
  if (loading && (!data || data.length === 0)) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="text-center py-4">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      {/* Header */}
      {customHeader || (
        <div className={`table-header ${headerClassName}`}>
          {columns.map((column) => {
            if (column.hidden) return null;
            return (
              <div
                key={column.id}
                className={`table-header-cell table-cell ${column.className || ''} ${cellClassName}`}
                onClick={() => column.sortable && onSort(column.id)}
                style={column.style}
              >
                <span>{column.label}</span>
                {column.sortable && column.renderSortIcon && column.renderSortIcon(column.id, sortConfig)}
              </div>
            );
          })}
        </div>
      )}

      {/* Rows */}
      <div className="table-rows">
        {data.map((item, idx) => (
          renderRow ? (
            renderRow(item, idx, rowRefs?.[idx])
          ) : (
            <div
              key={item.id || idx}
              ref={el => rowRefs && (rowRefs[idx] = el)}
              className={`table-row ${rowClassName}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => {
                if (column.hidden) return null;
                return (
                  <div
                    key={column.id}
                    className={`table-cell ${column.className || ''} ${cellClassName}`}
                    style={column.style}
                  >
                    {column.render ? column.render(item) : item[column.id]}
                  </div>
                );
              })}
            </div>
          )
        ))}
      </div>

      {/* Footer */}
      {customFooter}
    </div>
  );
};

export default Table; 