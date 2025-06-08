export const fetchAllLocations = async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/location');
    const data = await response.json();
    const totalPages = data.info.pages;
    
    const pagePromises = [];
    for (let i = 2; i <= totalPages; i++) {
      pagePromises.push(fetch(`https://rickandmortyapi.com/api/location?page=${i}`).then(res => res.json()));
    }
    
    const allPagesData = await Promise.all(pagePromises);
    
    const allLocations = [
      ...data.results,
      ...allPagesData.flatMap(pageData => pageData.results)
    ];
    
    return allLocations;
  } catch (err) {
    throw new Error('Konumlar yüklenirken bir hata oluştu.');
  }
}; 