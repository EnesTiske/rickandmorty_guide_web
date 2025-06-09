export async function fetchEpisodes(page = 1, filters = {}) {
  const params = new URLSearchParams();
  params.append('page', page);
  if (filters.name) params.append('name', filters.name);
  if (filters.episode) params.append('episode', filters.episode);

  const url = `https://rickandmortyapi.com/api/episode?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Bölümler yüklenirken bir hata oluştu.');
  }
  return await response.json();
}

export async function fetchAllEpisodes() {
  const url = 'https://rickandmortyapi.com/api/episode';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Bölümler yüklenirken bir hata oluştu.');
  }
  const data = await response.json();
  
  // Tüm sayfaları getir
  const totalPages = data.info.pages;
  const allEpisodes = [...data.results];
  
  for (let page = 2; page <= totalPages; page++) {
    const pageUrl = `${url}?page=${page}`;
    const pageResponse = await fetch(pageUrl);
    if (!pageResponse.ok) {
      throw new Error(`Sayfa ${page} yüklenirken bir hata oluştu.`);
    }
    const pageData = await pageResponse.json();
    allEpisodes.push(...pageData.results);
  }
  
  return allEpisodes;
}

export async function fetchEpisodeById(id) {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Bölüm detayları yüklenirken bir hata oluştu.');
  }
  return await response.json();
} 