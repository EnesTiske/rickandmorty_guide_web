import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      if (error.response.status === 404) {
        throw new Error('Karakter bulunamadı. Lütfen filtreleri kontrol edin.');
      }
      throw new Error(error.response.data.error || 'Bir hata oluştu.');
    } else if (error.request) {
      console.error('API Error Request:', error.request);
      throw new Error('Ağ hatası: Sunucuya ulaşılamadı.');
    } else {
      console.error('API Error Message:', error.message);
      throw new Error('Bir hata oluştu: ' + error.message);
    }
  }
);

export const fetchCharacters = async (page = 1, filters = {}) => {
  try {
    const params = new URLSearchParams({
      page,
      ...filters
    });
    
    const response = await apiClient.get(`/character?${params}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await apiClient.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEpisodes = async (episodeUrls) => {
  try {
    const episodeIds = episodeUrls.map(url => url.split('/').pop()).join(',');
    const response = await apiClient.get(`/episode/${episodeIds}`);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    throw error;
  }
}; 