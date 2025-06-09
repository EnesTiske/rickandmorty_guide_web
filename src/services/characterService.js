import { API_BASE_URL } from '../utils/constants';

export const getCharacters = async () => {
  const response = await fetch(`${API_BASE_URL}/character`);
  return response.json();
};

export const getAllCharacters = async () => {
  const response = await fetch(`${API_BASE_URL}/character`);
  const data = await response.json();
  const totalPages = data.info.pages;
  const pagePromises = [];

  for (let i = 2; i <= totalPages; i++) {
    pagePromises.push(fetch(`${API_BASE_URL}/character?page=${i}`).then(res => res.json()));
  }

  const results = await Promise.all(pagePromises);
  return [data, ...results];
};

export const getCharactersByIds = async (ids) => {
  const response = await fetch(`${API_BASE_URL}/character/${ids}`);
  const data = await response.json();
  if (Array.isArray(data)) return data;
  if (data.results) return data.results;
  if (data.id) return [data];
  return [];
}; 