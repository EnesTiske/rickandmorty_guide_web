export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'bg-green-100 text-green-800';
    case 'dead':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getEpisodeNumber = (episodeUrl) => {
  return episodeUrl.split('/').pop();
};

export const getSortIcon = (columnId, sortConfig) => {
  if (sortConfig.key !== columnId || !sortConfig.direction) return '';
  if (sortConfig.direction === 'ascending' || sortConfig.direction === 'asc') return '↑';
  if (sortConfig.direction === 'descending' || sortConfig.direction === 'desc') return '↓';
  return  '';
}; 