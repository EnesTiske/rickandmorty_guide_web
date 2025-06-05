import React, { useRef } from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import { TABLE_COLUMNS } from '../../utils/constants';
import { getStatusColor, getSortIcon } from '../../utils/helpers';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import CharacterTableRow from './CharacterTableRow';
import './CharacterTable.css';
import PaginationButton from '../Pagination/PaginationButton';

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

  // Her satır için ref array'i
  const rowRefs = useRef([]);

  if (loading && characters.length === 0) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!characters.length) {
    return (
      <div className="text-center py-4">
        <p>Karakter bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="character-table-container">
      {/* Header */}
      <div className="character-table-header">
        {TABLE_COLUMNS.map((column) => {
          if (column.id === 'image') return null;
          let extraClass = '';
          if (column.id === 'id') extraClass = 'character-table-id-cell character-table-square-cell';
          else if (column.id === 'name') extraClass = 'character-table-name-cell';
          else extraClass = 'character-table-info-cell';
          return (
            <div
              key={column.id}
              className={`character-table-header-cell character-table-cell ${extraClass}`}
              onClick={() => column.sortable && requestSort(column.id)}
            >
              <span>{column.label}</span>
              {column.sortable && (
                <span className="text-sm">
                  {getSortIcon(column.id, sortConfig)}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* Satırlar */}
      <div>
        {characters.map((character, idx) => (
          <CharacterTableRow
            key={character.id}
            character={character}
            onClick={() => selectCharacter(character)}
            rowRef={el => rowRefs.current[idx] = el}
          />
        ))}
      </div>
      {/* Devamını Yükle Butonu */}
      <PaginationButton rowRefs={rowRefs} characterCount={characters.length} />
    </div>
  );
};

export default CharacterTable; 