import React, { useEffect } from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import { getStatusColor, formatDate, getEpisodeNumber } from '../../utils/helpers';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';

const CharacterDetails = () => {
  const {
    selectedCharacter,
    loading,
    error,
    closeDetails
  } = useCharacterContext();

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="text-red-500">{error}</p>
          <Button onClick={closeDetails} className="mt-4">
            Kapat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
          <Button onClick={closeDetails} variant="secondary">
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
              <h3 className="font-semibold text-gray-700">Durum</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(selectedCharacter.status)}`}>
                {selectedCharacter.status}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Tür</h3>
              <p>{selectedCharacter.species}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Cinsiyet</h3>
              <p>{selectedCharacter.gender}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Orijin</h3>
              <p>{selectedCharacter.origin.name}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Konum</h3>
              <p>{selectedCharacter.location.name}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Oluşturulma Tarihi</h3>
              <p>{formatDate(selectedCharacter.created)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Bölümler</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {selectedCharacter.episode.map((episodeUrl) => {
              const episodeNumber = getEpisodeNumber(episodeUrl);
              return (
                <div
                  key={episodeUrl}
                  className="bg-gray-100 p-2 rounded text-sm"
                >
                  Bölüm {episodeNumber}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails; 