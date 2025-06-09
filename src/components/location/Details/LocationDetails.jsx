import React, { useEffect, useState } from 'react';
import { useLocationContext } from '../../../contexts/LocationContext';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';
import { getCharacters } from '../../../services/characterService';

const LocationDetails = () => {
  const {
    selectedLocation,
    loading,
    error,
    closeDetails
  } = useLocationContext();

  const [residents, setResidents] = useState([]);
  const [residentsLoading, setResidentsLoading] = useState(false);
  const [residentsError, setResidentsError] = useState(null);

  const fetchResidents = async (ids) => {
    return getCharacters(ids);
  };

  useEffect(() => {
    if (!selectedLocation) return;
    if (!selectedLocation.residents.length) {
      setResidents([]);
      return;
    }
    const ids = selectedLocation.residents.map(url => url.split('/').pop()).join(',');
    console.log('Resident IDs:', ids);
    setResidentsLoading(true);
    setResidentsError(null);
    fetchResidents(ids)
      .then(data => {
        let result;
        if (Array.isArray(data)) {
          result = data;
        } else if (data.results) {
          result = data.results;
        } else if (data.id) {
          result = [data];
        } else {
          result = [];
        }
        console.log('Residents API result:', result);
        setResidents(result);
      })
      .catch(() => setResidentsError('Karakterler yüklenemedi.'))
      .finally(() => setResidentsLoading(false));
  }, [selectedLocation]);

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

  if (!selectedLocation) return null;

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

  return (
    <div 
      className="fixed inset-0 bg-modal-light-overlay dark:bg-modal-dark-overlay flex items-center justify-center z-[100] pt-16"
      onClick={handleBackdropClick}
    >
      <div className="bg-modal-light-bg dark:bg-modal-dark-bg p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-modal-light-text dark:text-modal-dark-text">{selectedLocation.name}</h2>
          <Button onClick={closeDetails} variant="secondary" className="bg-modal-dark-border dark:bg-modal-dark-border text-modal-dark-text dark:text-modal-dark-text hover:bg-modal-dark-border/80 dark:hover:bg-modal-dark-border/80">
            Kapat
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Tür</h3>
            <p className="text-modal-light-text dark:text-modal-dark-text">{selectedLocation.type}</p>
          </div>

          <div>
            <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Boyut</h3>
            <p className="text-modal-light-text dark:text-modal-dark-text">{selectedLocation.dimension}</p>
          </div>

          <div>
            <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text">Oluşturulma Tarihi</h3>
            <p className="text-modal-light-text dark:text-modal-dark-text">{new Date(selectedLocation.created).toLocaleDateString('tr-TR')}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-modal-light-text dark:text-modal-dark-text mb-2">Sakinleri</h3>
          {residentsLoading ? (
            <Spinner size="small" />
          ) : residentsError ? (
            <div className="text-red-500">{residentsError}</div>
          ) : residents.length === 0 ? (
            <div className="text-gray-500">Bu konumda hiç karakter yok.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {residents.map((resident, idx) => (
                <div
                  key={resident.id || resident.name || idx}
                  className="flex flex-col items-center bg-modal-light-border dark:bg-modal-dark-border p-2 rounded text-sm text-modal-light-text dark:text-modal-dark-text border border-modal-light-border dark:border-modal-dark-border"
                >
                  <img src={resident.image} alt={resident.name} className="w-16 h-16 rounded-full mb-1 object-cover" />
                  <span>{resident.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetails; 