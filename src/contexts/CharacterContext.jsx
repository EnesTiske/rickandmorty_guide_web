import React, { createContext, useContext, useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import { ITEMS_PER_PAGE } from '../utils/constants';

const CharacterContext = createContext();

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};

export const CharacterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: [],
    gender: [],
    species: []
  });

  const {
    characters,
    selectedCharacter,
    currentPage,
    totalPages,
    itemsPerPage,
    loading,
    error,
    sortConfig,
    setCurrentPage,
    setItemsPerPage,
    requestSort,
    selectCharacter,
    closeDetails
  } = useCharacters(filters);

  const value = {
    characters,
    loading,
    error,
    selectedCharacter,
    selectCharacter,
    closeDetails,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    sortConfig,
    requestSort
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}; 