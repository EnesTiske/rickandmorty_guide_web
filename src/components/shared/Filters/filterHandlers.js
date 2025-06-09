export const handleInputChange = (setFilters) => (e) => {
  const { name, value } = e.target;
  setFilters(prev => ({
    ...prev,
    [name]: value
  }));
};

export const handleMultiSelectChange = (setFilters) => (e, filterName) => {
  const { value, checked } = e.target;
  setFilters(prev => {
    const currentValues = prev[filterName] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(item => item !== value);
    }
    
    return {
      ...prev,
      [filterName]: newValues
    };
  });
};

export const handleItemsPerPageChange = (setItemsPerPage, setCurrentPage) => (e) => {
  const newValue = Number(e.target.value);
  setItemsPerPage(newValue);
  setCurrentPage(1);
}; 