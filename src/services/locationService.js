import { API_BASE_URL } from '../utils/constants';

export const getLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/location`);
    const data = await response.json();
    const totalPages = data.info.pages;
    const pagePromises = [];

    for (let i = 2; i <= totalPages; i++) {
      pagePromises.push(fetch(`${API_BASE_URL}/location?page=${i}`).then(res => res.json()));
    }

    const results = await Promise.all(pagePromises);
    const allLocations = [data, ...results].flatMap(page => page.results);
    return { results: allLocations, info: data.info };
  } catch (error) {
    throw new Error('Konumlar yüklenirken bir hata oluştu.');
  }
};

export const getLocationById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/location/${id}`);
    return await response.json();
  } catch (error) {
    throw new Error('Konum detayları yüklenirken bir hata oluştu.');
  }
};

export const getAllLocations = async () => {
  const response = await fetch(`${API_BASE_URL}/location`);
  const data = await response.json();
  const totalPages = data.info.pages;
  const pagePromises = [];

  for (let i = 2; i <= totalPages; i++) {
    pagePromises.push(fetch(`${API_BASE_URL}/location?page=${i}`).then(res => res.json()));
  }

  const results = await Promise.all(pagePromises);
  return [data, ...results];
}; 