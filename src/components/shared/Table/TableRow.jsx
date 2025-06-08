import React, { useState } from 'react';
import './Table.css';

const TableRow = ({
  data,
  columns,
  onClick,
  rowRef,
  className = '',
  cellClassName = '',
  hoverEffect = true,
  active = false,
  customCells = {},
  onMouseEnter,
  onMouseLeave,
  baseRowClassName = 'table-row',
  baseCellClassName = 'table-cell',
  hoverClassName = 'hover-effect',
  activeClassName = 'active'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter && onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave && onMouseLeave();
  };

  return (
    <div
      ref={rowRef}
      className={`${baseRowClassName} ${hoverEffect ? hoverClassName : ''} ${isHovered ? 'hovered' : ''} ${active ? activeClassName : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {columns.map((column) => {
        if (column.hidden) return null;

        // Özel hücre render fonksiyonu varsa onu kullan
        if (customCells[column.id]) {
          return (
            <div
              key={column.id}
              className={`${baseCellClassName} ${column.className || ''} ${cellClassName}`}
              style={column.style}
            >
              {customCells[column.id](data)}
            </div>
          );
        }

        // Varsayılan render
        return (
          <div
            key={column.id}
            className={`${baseCellClassName} ${column.className || ''} ${cellClassName}`}
            style={column.style}
          >
            {column.render ? column.render(data) : data[column.id]}
          </div>
        );
      })}
    </div>
  );
};

export default TableRow; 