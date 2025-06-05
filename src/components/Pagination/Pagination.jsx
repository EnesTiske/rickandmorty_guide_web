import React from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import Button from '../shared/Button';

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    loading
  } = useCharacterContext();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={currentPage === i ? 'primary' : 'secondary'}
          disabled={loading}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <Button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || loading}
        variant="secondary"
      >
        İlk
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        variant="secondary"
      >
        Önceki
      </Button>

      {renderPageNumbers()}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        variant="secondary"
      >
        Sonraki
      </Button>
      <Button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || loading}
        variant="secondary"
      >
        Son
      </Button>
    </div>
  );
};

export default Pagination; 