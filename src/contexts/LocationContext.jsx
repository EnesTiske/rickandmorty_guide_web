import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchAllLocations } from '../services/locationService';

const LocationContext = createContext();

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllLocations();
      setLocations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const openDetails = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const value = {
    locations,
    loading,
    error,
    fetchLocations,
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