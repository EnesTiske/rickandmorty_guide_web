import { useState, useEffect } from 'react';
import { getLocations } from '../services/locationService';
import { ITEMS_PER_PAGE } from '../utils/constants';

export function useLocations(filters) {
  const [allLocations, setAllLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'ascending'
  });

  // Tüm konumları yükle
  useEffect(() => {
    setLoading(true);
    getLocations()
      .then(data => {
        setAllLocations(data.results);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filtreleme ve sayfalama
  useEffect(() => {
    let filtered = [...allLocations];
    
    // Arama filtresi
    if (filters.search) {
      filtered = filtered.filter(loc => 
        loc.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Type filtresi
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(loc => {
        return filters.type.some(type => 
          loc.type.toLowerCase() === type.toLowerCase()
        );
      });
    }

    // Dimension filtresi
    if (filters.dimension && filters.dimension.length > 0) {
      filtered = filtered.filter(loc => {
        return filters.dimension.some(dimension => 
          loc.dimension.toLowerCase() === dimension.toLowerCase()
        );
      });
    }

    // Sıralama
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (sortConfig.key === 'residents') {
          return sortConfig.direction === 'ascending'
            ? a.residents.length - b.residents.length
            : b.residents.length - a.residents.length;
        }
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

    setLocations(paginatedData);
  }, [allLocations, filters, currentPage, itemsPerPage, sortConfig]);

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

  return { 
    locations, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    itemsPerPage,
    sortConfig,
    setCurrentPage,
    setItemsPerPage: handleItemsPerPageChange,
    requestSort
  };
} 