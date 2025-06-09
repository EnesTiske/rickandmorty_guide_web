import React, { createContext, useContext, useState } from 'react';
import { useLocations } from '../hooks/useLocations';
import { ITEMS_PER_PAGE } from '../utils/constants';

const LocationContext = createContext();

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: [],
    dimension: []
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const {
    locations,
    loading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    sortConfig,
    setCurrentPage,
    setItemsPerPage,
    requestSort
  } = useLocations(filters);

  const openDetails = (location) => setSelectedLocation(location);
  const closeDetails = () => setSelectedLocation(null);

  const value = {
    locations,
    loading,
    error,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    sortConfig,
    requestSort,
    selectedLocation,
    openDetails,
    closeDetails
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}; 