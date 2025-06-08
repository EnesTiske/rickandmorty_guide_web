import React, { useRef } from 'react';
import { useCharacterContext } from '../../../contexts/CharacterContext';
import { TABLE_COLUMNS } from '../../../utils/constants';
import { getSortIcon } from '../../../utils/helpers';
import Table from '../../shared/Table/Table';
import CharacterTableRow from './CharacterTableRow';
import './CharacterTable.css';
import PaginationButton from '../../Pagination/PaginationButton';

const CharacterTable = () => {
  const {
    characters,
    loading,
    error,
    sortConfig,
    requestSort,
    selectCharacter,
    currentPage,
    totalPages
  } = useCharacterContext();

  const rowRefs = useRef([]);

  const columns = TABLE_COLUMNS.map(column => ({
    ...column,
    renderSortIcon: getSortIcon,
    className: column.id === 'id' 
      ? 'character-table-id-cell character-table-square-cell'
      : column.id === 'name'
      ? 'character-table-name-cell'
      : 'character-table-info-cell'
  }));

  const renderCharacterRow = (character, idx, rowRef) => (
    <CharacterTableRow
      key={character.id}
      character={character}
      onClick={() => selectCharacter(character)}
      rowRef={rowRef}
    />
  );

  return (
    <Table
      columns={columns}
      data={characters}
      onRowClick={selectCharacter}
      sortConfig={sortConfig}
      onSort={requestSort}
      rowRefs={rowRefs.current}
      loading={loading}
      error={error}
      emptyMessage="Karakter bulunamadı."
      renderRow={renderCharacterRow}
      className="character-table-container"
      headerClassName="character-table-header"
      rowClassName="character-table-row"
      cellClassName="character-table-cell"
      customFooter={<PaginationButton rowRefs={rowRefs} characterCount={characters.length} />}
    />
  );
};

export default CharacterTable; 