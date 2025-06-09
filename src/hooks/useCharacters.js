import { useState, useEffect } from 'react';
import { getCharacters } from '../services/characterService';
import { ITEMS_PER_PAGE } from '../utils/constants';

export function useCharacters(filters) {
  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'ascending'
  });

  // Tüm karakterleri yükle
  useEffect(() => {
    setLoading(true);
    getCharacters()
      .then(data => {
        setAllCharacters(data.results);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filtreleme ve sayfalama
  useEffect(() => {
    let filtered = [...allCharacters];
    
    // Arama filtresi
    if (filters.search) {
      filtered = filtered.filter(character => 
        character.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filtresi
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(character => {
        return filters.status.some(status => 
          character.status.toLowerCase() === status.toLowerCase()
        );
      });
    }

    // Gender filtresi
    if (filters.gender && filters.gender.length > 0) {
      filtered = filtered.filter(character => {
        return filters.gender.some(gender => 
          character.gender.toLowerCase() === gender.toLowerCase()
        );
      });
    }

    // Species filtresi
    if (filters.species && filters.species.length > 0) {
      filtered = filtered.filter(character => {
        return filters.species.some(species => 
          character.species.toLowerCase() === species.toLowerCase()
        );
      });
    }

    // Sıralama
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    // Toplam sayfa sayısını hesapla
    const total = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(total);

    // Mevcut sayfa numarasını kontrol et
    if (currentPage > total) {
      setCurrentPage(1);
    }

    // Mevcut sayfadaki verileri al
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);

    setCharacters(paginatedData);
  }, [allCharacters, filters, currentPage, itemsPerPage, sortConfig]);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      setSortConfig({ key: null, direction: null });
      return;
    }
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const closeDetails = () => {
    setSelectedCharacter(null);
  };

  return {
    characters,
    selectedCharacter,
    currentPage,
    totalPages,
    itemsPerPage,
    loading,
    error,
    sortConfig,
    setCurrentPage,
    setItemsPerPage: handleItemsPerPageChange,
    requestSort,
    selectCharacter,
    closeDetails
  };
} 
