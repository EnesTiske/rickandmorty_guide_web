export const STATUS_OPTIONS = [
  { value: '', label: 'Tümü' },
  { value: 'alive', label: 'Yaşıyor' },
  { value: 'dead', label: 'Ölü' },
  { value: 'unknown', label: 'Bilinmiyor' }
];

export const GENDER_OPTIONS = [
  { value: '', label: 'Tümü' },
  { value: 'female', label: 'Kadın' },
  { value: 'male', label: 'Erkek' },
  { value: 'genderless', label: 'Cinsiyetsiz' },
  { value: 'unknown', label: 'Bilinmiyor' }
];

export const TABLE_COLUMNS = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'name', label: 'İsim', sortable: true },
  { id: 'status', label: 'Durum', sortable: true },
  { id: 'species', label: 'Tür', sortable: true },
  { id: 'gender', label: 'Cinsiyet', sortable: true }
];

export const ITEMS_PER_PAGE = 20;

export const API_BASE_URL = 'https://rickandmortyapi.com/api'; 