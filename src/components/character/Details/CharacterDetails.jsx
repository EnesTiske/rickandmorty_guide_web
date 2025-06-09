import React, { useEffect, useState } from 'react';
import { useCharacterContext } from '../../../contexts/CharacterContext';
import { getStatusColor, formatDate } from '../../../utils/helpers';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';
import { getEpisodeById } from '../../../services/episodeService';

function groupEpisodesBySeason(episodes) {
  const grouped = {};
  episodes.forEach(ep => {
    const seasonMatch = ep.episode.match(/^S(\d+)E\d+$/i);
    const season = seasonMatch ? parseInt(seasonMatch[1], 10) : 0;
    if (!grouped[season]) grouped[season] = [];
    grouped[season].push(ep);
  });
  return grouped;
}

const CharacterDetails = () => {
  const {
    selectedCharacter,
    loading,
    error,
    closeDetails
  } = useCharacterContext();

  const [episodes, setEpisodes] = useState([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [episodesError, setEpisodesError] = useState(null);

  const fetchEpisodes = async (ids) => {
    return getEpisodeById(ids);
  };

  useEffect(() => {
    if (!selectedCharacter) return;
    if (!selectedCharacter.episode.length) {
      setEpisodes([]);
      return;
    }
    const ids = selectedCharacter.episode.map(url => url.split('/').pop()).join(',');
    setEpisodesLoading(true);
    setEpisodesError(null);
    fetchEpisodes(ids)
      .then(data => {
        setEpisodes(Array.isArray(data) ? data : [data]);
      })
      .catch(() => setEpisodesError('Bölümler yüklenemedi.'))
      .finally(() => setEpisodesLoading(false));
  }, [selectedCharacter]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeDetails();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeDetails]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeDetails();
    }
  };

  if (!selectedCharacter) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-modal-light-overlay dark:bg-modal-dark-overlay flex items-center justify-center z-[100] pt-16">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-modal-light-overlay dark:bg-modal-dark-overlay flex items-center justify-center z-[100] pt-16">
        <div className="bg-modal-light-bg dark:bg-modal-dark-bg p-4 rounded-lg shadow-lg">
          <p className="text-red-500">{error}</p>
          <Button onClick={closeDetails} className="mt-4">
            Kapat
          </Button>
        </div>
      </div>
    );
  }

  // Bölümleri sezonlara göre grupla
  const groupedEpisodes = groupEpisodesBySeason(episodes);
  const sortedSeasons = Object.keys(groupedEpisodes).sort((a, b) => a - b);

  return (
    <div 
      className="fixed inset-0 bg-modal-light-overlay dark:bg-modal-dark-overlay flex items-center justify-center z-[100] pt-16"
      onClick={handleBackdropClick}
    >
      <div className="bg-modal-light-bg dark:bg-modal-dark-bg p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-modal-light-text dark:text-modal-dark-text">{selectedCharacter.name}</h2>
          <Button onClick={closeDetails} variant="secondary" className="bg-modal-dark-border dark:bg-modal-dark-border text-modal-dark-text dark:text-modal-dark-text hover:bg-modal-dark-border/80 dark:hover:bg-modal-dark-border/80">
            Kapat
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={selectedCharacter.image}
              alt={selectedCharacter.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Durum</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(selectedCharacter.status)}`}>
                {selectedCharacter.status}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Tür</h3>
              <p className="text-modal-light-text dark:text-modal-dark-text">{selectedCharacter.species}</p>
            </div>

            <div>
              <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Cinsiyet</h3>
              <p className="text-modal-light-text dark:text-modal-dark-text">{selectedCharacter.gender}</p>
            </div>

            <div>
              <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Son Görünen Konum</h3>
              <p className="text-modal-light-text dark:text-modal-dark-text">{selectedCharacter.location.name}</p>
            </div>

            <div>
              <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">İlk Görünen Konum</h3>
              <p className="text-modal-light-text dark:text-modal-dark-text">{selectedCharacter.origin.name}</p>
            </div>

            <div>
              <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Oluşturulma Tarihi</h3>
              <p className="text-modal-light-text dark:text-modal-dark-text">{formatDate(selectedCharacter.created)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text mb-2">Bölümler</h3>
          {episodesLoading ? (
            <Spinner size="small" />
          ) : episodesError ? (
            <div className="text-red-500">{episodesError}</div>
          ) : episodes.length === 0 ? (
            <div className="text-gray-500">Bu karakterin bölümü yok.</div>
          ) : (
            <div className="space-y-4">
              {sortedSeasons.map(season => (
                <div key={season}>
                  <div className="font-bold text-lg mb-1">Sezon {season}</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {groupedEpisodes[season].map(ep => (
                      <div
                        key={ep.id}
                        className="bg-modal-light-border dark:bg-modal-dark-border p-2 rounded text-sm text-modal-light-text dark:text-modal-dark-text border border-modal-light-border dark:border-modal-dark-border"
                      >
                        <div className="font-semibold">{ep.name}</div>
                        <div className="text-xs text-gray-500">{formatDate(ep.air_date)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails; 