import React, { useEffect } from 'react';
import './PaginationButton.css';

const PaginationButton = ({ 
  rowRefs, 
  characterCount,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  loading
}) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || loading) return;
    onPageChange(page);
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          disabled={loading}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="pagination-btn-container">
        <div className="pagination-btn-group">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-btn"
            disabled={currentPage === 1 || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {currentPage > 3 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="pagination-btn"
                disabled={loading}
              >
                1
              </button>
              {currentPage > 4 && <span className="pagination-dots text-gray-500">..</span>}
            </>
          )}

          {renderPageNumbers()}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className="pagination-dots text-gray-500">..</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="pagination-btn"
                disabled={loading}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-btn"
            disabled={currentPage === totalPages || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="scroll-buttons">
        <button onClick={scrollToTop} className="scroll-button" title="Başa Git">
          ↑
        </button>
        <button onClick={scrollToBottom} className="scroll-button" title="Sona Git">
          ↓
        </button>
      </div>
    </>
  );
};

export default PaginationButton; 