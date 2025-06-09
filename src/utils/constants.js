export const STATUS_OPTIONS = [
  { value: 'alive', label: 'Yaşıyor' },
  { value: 'dead', label: 'Ölü' },
  { value: 'unknown', label: 'Bilinmiyor' }
];

export const GENDER_OPTIONS = [
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

export const LOCATION_COLUMNS = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'name', label: 'İsim', sortable: true },
  { id: 'type', label: 'Tip', sortable: true },
  { id: 'dimension', label: 'Boyut', sortable: true },
  { 
    id: 'residents', 
    label: 'Sakin Sayısı', 
    sortable: true,
    render: (location) => location.residents.length
  }
];

export const ITEMS_PER_PAGE = 20;

export const ITEMS_PER_PAGE_OPTIONS = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
  { value: 500, label: '500' },
  { value: 1000, label: '1000' }
];

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const TYPE_OPTIONS = [
  { value: '', label: 'Diğer' },
  { value: 'Planet', label: 'Gezegen' },
  { value: 'Space station', label: 'Uzay İstasyonu' },
  { value: 'Microverse', label: 'Mikro Evren' },
  { value: 'TV', label: 'TV' },
  { value: 'Resort', label: 'Tatil Yeri' },
  { value: 'Fantasy town', label: 'Fantastik Şehir' },
  { value: 'Dream', label: 'Rüya' },
  { value: 'Dimension', label: 'Boyut' },
  { value: 'unknown', label: 'Bilinmeyen' }
];

export const DIMENSION_OPTIONS = [
  { value: '', label: 'Diğer' },
  { value: 'Dimension C-137', label: 'Dimension C-137' },
  { value: 'unknown', label: 'Bilinmeyen' },
  { value: 'Post-Apocalyptic Dimension', label: 'Kıyamet Sonrası Boyut' },
  { value: 'Replacement Dimension', label: 'Yedek Boyut' },
  { value: 'Cronenberg Dimension', label: 'Cronenberg Boyutu' },
  { value: 'Fantasy Dimension', label: 'Fantastik Boyut' },
  { value: 'Dimension 5-126', label: 'Dimension 5-126' }
]; 