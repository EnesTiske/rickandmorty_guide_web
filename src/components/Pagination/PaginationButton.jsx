import React, { useRef } from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import './PaginationButton.css';

const PaginationButton = ({ rowRefs, characterCount }) => {
  const { currentPage, totalPages, loading, loadMoreCharacters, resetCharactersToFirstPage } = useCharacterContext();
  const prevCountRef = useRef(characterCount);

  const handleLoadMore = async () => {
    prevCountRef.current = characterCount;
    await loadMoreCharacters();
    // Yeni eklenen ilk satıra scroll yap
    const firstNewRow = rowRefs.current[prevCountRef.current];
    if (firstNewRow) {
      firstNewRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if ((currentPage >= totalPages && characterCount <= 20) || loading) return null;
  return (
    <div className="pagination-btn-container">
      <div className="pagination-btn-group">
        {currentPage < totalPages && (
          <button onClick={handleLoadMore} className="pagination-btn">
            Devamını Yükle
          </button>
        )}
        {characterCount > 20 && (
          <button onClick={resetCharactersToFirstPage} className="show-less-btn">
            Daha Az Göster
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginationButton; 