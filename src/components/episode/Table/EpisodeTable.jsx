import { useState } from 'react';
import { useEpisodes } from '../../../hooks/useEpisodes';
import { groupEpisodesBySeason, getSeasons, getSeasonAndEpisode } from '../../../utils/episodeUtils';
import EpisodeDetails from '../Details/EpisodeDetails';
import './EpisodeTable.css';

export default function EpisodeTable() {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);

  const { episodes, loading, error } = useEpisodes();
  const seasons = getSeasons(episodes);
  const episodesBySeason = groupEpisodesBySeason(episodes);

  const filteredEpisodes = selectedSeason
    ? episodesBySeason[selectedSeason]?.filter(episode =>
        episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.episode.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : episodes.filter(episode =>
        episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.episode.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="episode-container">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Bölüm adı veya kodu ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sezonlar Listesi */}
        <div className="md:col-span-1 md:sticky md:top-32 h-fit">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Sezonlar</h2>
          <div className="space-y-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`season-button${selectedSeason === season ? ' season-button-active' : ''}`}
              >
                Sezon {season}
              </button>
            ))}
          </div>
        </div>

        {/* Bölümler Listesi */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            {selectedSeason ? `Sezon ${selectedSeason} Bölümleri` : 'Tüm Bölümler'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {filteredEpisodes.map((episode) => {
              const { episode: episodeNumber } = getSeasonAndEpisode(episode.episode);
              return (
                <div
                  key={episode.id}
                  className="episode-table-row cursor-pointer"
                  onClick={() => setSelectedEpisodeId(episode.id)}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex-1">
                      <h3 className="episode-table-name mb-2">
                        {episode.name}
                      </h3>
                      <p className="episode-table-code mb-2">
                        {episode.episode}
                      </p>
                      <p className="episode-table-date">
                        Yayın Tarihi: {episode.air_date}
                      </p>
                    </div>
                    <div className="episode-number">
                      {episodeNumber}. Bölüm
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Detay Modalı */}
      {selectedEpisodeId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative w-full max-w-2xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setSelectedEpisodeId(null)}
            >
              ✕
            </button>
            <EpisodeDetails episodeId={selectedEpisodeId} onClose={() => setSelectedEpisodeId(null)} />
          </div>
        </div>
      )}
    </div>
  );
} 