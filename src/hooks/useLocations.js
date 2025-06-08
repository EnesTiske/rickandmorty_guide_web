import { useState, useEffect } from 'react';
import { fetchAllLocations } from '../services/locationService';

export function useLocations(filters) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchAllLocations()
      .then(data => {
        let filtered = data;
        if (filters.search) {
          filtered = filtered.filter(loc => loc.name.toLowerCase().includes(filters.search.toLowerCase()));
        }
        if (filters.type) {
          filtered = filtered.filter(loc => loc.type === filters.type);
        }
        if (filters.dimension) {
          filtered = filtered.filter(loc => loc.dimension === filters.dimension);
        }
        setLocations(filtered);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  return { locations, loading, error };
} 