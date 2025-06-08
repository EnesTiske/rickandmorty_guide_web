import React, { useRef, useEffect } from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import './PaginationButton.css';

const PaginationButton = ({ rowRefs, characterCount }) => {
  const { currentPage, totalPages, loading, loadMoreCharacters, resetCharactersToFirstPage } = useCharacterContext();
  const prevCountRef = useRef(characterCount);
  const observerRef = useRef(null);
  const loadMoreTriggerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '1000px 0px 0px 0px',
      threshold: 0.001
    };

    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && currentPage < totalPages) {
        handleLoadMore();
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    if (loadMoreTriggerRef.current) {
      observerRef.current.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentPage, totalPages, loading]);

  const handleLoadMore = async () => {
    prevCountRef.current = characterCount;
    await loadMoreCharacters();
    const firstNewRow = rowRefs.current[prevCountRef.current];
    if (firstNewRow) {
      firstNewRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if ((currentPage >= totalPages && characterCount <= 20) || loading) return null;
  
  return (
    <>
      <div className="pagination-btn-container">
        <div className="pagination-btn-group">
          <div ref={loadMoreTriggerRef} style={{ height: '1000px' }} />
          {characterCount > 20 && (
            <button onClick={resetCharactersToFirstPage} className="show-less-btn">
              Daha Az Göster
            </button>
          )}
        </div>
      </div>
      <div className="scroll-buttons">
        <button onClick={scrollToTop} className="scroll-button" title="Başa Git">
          ↑
        </button>
      </div>
    </>
  );
};

export default PaginationButton; 