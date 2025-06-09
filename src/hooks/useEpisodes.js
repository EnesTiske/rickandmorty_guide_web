import { useState, useEffect } from 'react';
import { getAllEpisodes, getEpisodeById } from '../services/episodeService';

export function useEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setLoading(true);
        const allPages = await getAllEpisodes();
        const allEpisodes = allPages.flatMap(page => page.results);
        setEpisodes(allEpisodes);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  return { episodes, loading, error };
}

export function useEpisodeDetails(episodeId) {
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEpisodeDetails = async () => {
      if (!episodeId) return;

      try {
        setLoading(true);
        const data = await getEpisodeById(episodeId);
        setEpisode(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodeDetails();
  }, [episodeId]);

  return { episode, loading, error };
} 