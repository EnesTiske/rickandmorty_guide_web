import { API_BASE_URL } from '../utils/constants';

export const getEpisodes = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const url = `${API_BASE_URL}/episode?${params.toString()}`;
  const response = await fetch(url);
  return response.json();
};

export const getAllEpisodes = async () => {
  const url = `${API_BASE_URL}/episode`;
  const response = await fetch(url);
  const data = await response.json();
  const totalPages = data.info.pages;
  const pagePromises = [];

  for (let i = 2; i <= totalPages; i++) {
    pagePromises.push(fetch(`${API_BASE_URL}/episode?page=${i}`).then(res => res.json()));
  }

  const results = await Promise.all(pagePromises);
  return [data, ...results];
};

export const getEpisodeById = async (id) => {
  const url = `${API_BASE_URL}/episode/${id}`;
  const response = await fetch(url);
  return response.json();
}; 