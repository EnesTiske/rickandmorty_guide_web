export async function fetchCharacters(page = 1, filters = {}) {
  const params = new URLSearchParams();
  params.append('page', page);
  if (filters.name) params.append('name', filters.name);
  if (filters.status) params.append('status', filters.status);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.species) params.append('species', filters.species);

  const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Karakterler yüklenirken bir hata oluştu.');
  }
  return await response.json();
} 