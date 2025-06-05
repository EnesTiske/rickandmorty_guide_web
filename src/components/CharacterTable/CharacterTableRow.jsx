import React, { useState } from 'react';
import { getStatusColor, getEpisodeNumber } from '../../utils/helpers';
import './CharacterTable.css';

const CharacterTableRow = ({ character, onClick, rowRef }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        ref={rowRef}
        className={`character-table-row${hovered ? ' active' : ''}`}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="character-table-cell character-table-square-cell character-table-id-cell">
          <span className="character-table-id">{character.id}</span>
        </div>
        <div className="character-table-cell character-table-name-cell" style={{justifyContent: 'flex-start', gap: '12px'}}>
          <img
            src={character.image}
            alt={character.name}
            className="character-table-img"
            width={40}
            height={40}
          />
          <span className="character-table-name">{character.name}</span>
        </div>
        <div className="character-table-cell character-table-info-cell">
          <span className={`character-table-status ${getStatusColor(character.status)}`}>{character.status}</span>
        </div>
        <div className="character-table-cell character-table-info-cell">
          <span className="character-table-species">{character.species}</span>
        </div>
        <div className="character-table-cell character-table-info-cell">
          <span className="character-table-gender">{character.gender}</span>
        </div>
      </div>
    </>
  );
};

export default CharacterTableRow;
