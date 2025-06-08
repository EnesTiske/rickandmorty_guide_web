import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchCharacters } from '../services/characterService';
import { useDebounce } from './useDebounce';

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    gender: '',
    species: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const debouncedSearch = useDebounce(filters.search, 500);
  const filtersRef = useRef(filters);
  const searchRef = useRef(debouncedSearch);

  // Filtre veya arama değişirse karakterleri sıfırla ve ilk sayfayı yükle
  useEffect(() => {
    const fetchFirstPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCharacters(1, {
          ...filters,
          name: debouncedSearch,
          search: undefined
        });
        setCharacters(data.results);
        setCurrentPage(1);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFirstPage();
    // eslint-disable-next-line
  }, [filters, debouncedSearch]);

  const requestSort = useCallback((key) => {
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      setSortConfig({ key: null, direction: null });
      const sortedById = [...characters].sort((a, b) => a.id - b.id);
      setCharacters(sortedById);
      return;
    }
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedCharacters = [...characters].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setCharacters(sortedCharacters);
  }, [characters, sortConfig]);

  const selectCharacter = useCallback((character) => {
    setSelectedCharacter(character);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedCharacter(null);
  }, []);

  // Devamını Yükle fonksiyonu
  const loadMoreCharacters = useCallback(async () => {
    if (currentPage >= totalPages) return;
    try {
      setLoading(true);
      setError(null);
      const nextPage = currentPage + 1;
      const data = await fetchCharacters(nextPage, {
        ...filters,
        name: debouncedSearch,
        search: undefined
      });
      setCharacters(prev => [...prev, ...data.results]);
      setCurrentPage(nextPage);
      setTotalPages(data.info.pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, totalPages, filters, debouncedSearch]);

  // Daha Az Göster fonksiyonu
  const resetCharactersToFirstPage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacters(1, {
        ...filters,
        name: debouncedSearch,
        search: undefined
      });
      setCharacters(data.results);
      setCurrentPage(1);
      setTotalPages(data.info.pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  return {
    characters,
    selectedCharacter,
    currentPage,
    totalPages,
    filters,
    loading,
    error,
    sortConfig,
    debouncedSearch,
    setCurrentPage,
    setFilters,
    requestSort,
    selectCharacter,
    closeDetails,
    loadMoreCharacters,
    resetCharactersToFirstPage
  };
}; 
