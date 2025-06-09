import { API_BASE_URL } from '../utils/constants';

export const getLocations = async () => {
  const response = await fetch(`${API_BASE_URL}/location`);
  return response.json();
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