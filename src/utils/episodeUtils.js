export function getSeasonAndEpisode(episodeCode) {
  const match = episodeCode.match(/S(\d+)E(\d+)/);
  if (!match) return { season: 0, episode: 0 };
  
  return {
    season: parseInt(match[1]),
    episode: parseInt(match[2])
  };
}

export function groupEpisodesBySeason(episodes) {
  return episodes.reduce((acc, episode) => {
    const { season } = getSeasonAndEpisode(episode.episode);
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {});
}

export function getSeasons(episodes) {
  const seasons = new Set();
  episodes.forEach(episode => {
    const { season } = getSeasonAndEpisode(episode.episode);
    seasons.add(season);
  });
  return Array.from(seasons).sort((a, b) => a - b);
} 