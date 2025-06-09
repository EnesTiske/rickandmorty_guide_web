import { useEffect, useState } from 'react';
import { useEpisodeDetails } from '../../../hooks/useEpisodes';
import { getCharactersByIds } from '../../../services/characterService';

export default function EpisodeDetails({ episodeId, onClose }) {
  const { episode, loading, error } = useEpisodeDetails(episodeId);
  const [characters, setCharacters] = useState([]);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [charactersError, setCharactersError] = useState(null);

  useEffect(() => {
    if (!episode || !episode.characters) return;
    if (episode.characters.length === 0) {
      setCharacters([]);
      return;
    }
    const ids = episode.characters.map(url => url.split('/').pop()).join(',');
    setCharactersLoading(true);
    setCharactersError(null);
    getCharactersByIds(ids)
      .then(data => {
        setCharacters(data);
      })
      .catch(() => setCharactersError('Karakterler yüklenemedi.'))
      .finally(() => setCharactersLoading(false));
  }, [episode]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose && onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  if (!episodeId) return null;

  return (
    <div className="fixed inset-0 bg-modal-light-overlay dark:bg-modal-dark-overlay flex items-center justify-center z-[100] pt-16" onClick={handleBackdropClick}>
      <div className="bg-modal-light-bg dark:bg-modal-dark-bg p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        {loading ? (
          <div className="text-center p-4">Yükleniyor...</div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : !episode ? null : (
          <>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{episode.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Bölüm Kodu:</span> {episode.episode}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Yayın Tarihi:</span> {episode.air_date}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Oluşturulma Tarihi:</span> {new Date(episode.created).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Bölümdeki Karakterler</h3>
              {charactersLoading ? (
                <div className="text-center">Yükleniyor...</div>
              ) : charactersError ? (
                <div className="text-red-500">{charactersError}</div>
              ) : characters.length === 0 ? (
                <div className="text-gray-500">Bu bölümde hiç karakter yok.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {characters.map((char) => (
                    <div
                      key={char.id}
                      className="flex flex-col items-center bg-modal-light-border dark:bg-modal-dark-border p-2 rounded text-sm text-modal-light-text dark:text-modal-dark-text border border-modal-light-border dark:border-modal-dark-border"
                    >
                      <img src={char.image} alt={char.name} className="w-16 h-16 rounded-full mb-1 object-cover" />
                      <span>{char.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 