import { API_BASE_URL } from '../utils/constants';

export const getCharacters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/character`);
    const data = await response.json();
    const totalPages = data.info.pages;
    const pagePromises = [];

    for (let i = 2; i <= totalPages; i++) {
      pagePromises.push(fetch(`${API_BASE_URL}/character?page=${i}`).then(res => res.json()));
    }

    const results = await Promise.all(pagePromises);
    const allCharacters = [data, ...results].flatMap(page => page.results);
    return { results: allCharacters, info: data.info };
  } catch (error) {
    throw new Error('Karakterler yüklenirken bir hata oluştu.');
  }
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
  try {
    const response = await fetch(`${API_BASE_URL}/character/${ids}`);
    return await response.json();
  } catch (error) {
    throw new Error('Karakter detayları yüklenirken bir hata oluştu.');
  }
}; 