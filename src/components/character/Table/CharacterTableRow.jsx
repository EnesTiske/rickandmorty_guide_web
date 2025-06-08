import React from 'react';
import { getStatusColor } from '../../../utils/helpers';
import TableRow from '../../shared/Table/TableRow';
import './CharacterTable.css';

const CharacterTableRow = ({ character, onClick, rowRef }) => {
  const customCells = {
    id: () => (
      <span className="character-table-id">{character.id}</span>
    ),
    name: () => (
      <>
        <img
          src={character.image}
          alt={character.name}
          className="character-table-img"
          width={40}
          height={40}
        />
        <span className="character-table-name">{character.name}</span>
      </>
    ),
    status: () => (
      <span className={`character-table-status ${getStatusColor(character.status)}`}>
        {character.status}
      </span>
    ),
    species: () => (
      <span className="character-table-species">{character.species}</span>
    ),
    gender: () => (
      <span className="character-table-gender">{character.gender}</span>
    )
  };

  return (
    <TableRow
      data={character}
      columns={[
        { id: 'id', className: 'character-table-square-cell character-table-id-cell' },
        { id: 'name', className: 'character-table-name-cell' },
        { id: 'status', className: 'character-table-info-cell' },
        { id: 'species', className: 'character-table-info-cell' },
        { id: 'gender', className: 'character-table-info-cell' }
      ]}
      onClick={onClick}
      rowRef={rowRef}
      className="character-table-row"
      cellClassName="character-table-cell"
      customCells={customCells}
      baseRowClassName="character-table-row"
      baseCellClassName="character-table-cell"
      hoverClassName="character-table-row-hover"
      activeClassName="character-table-row-active"
    />
  );
};

export default CharacterTableRow;
