import { useEpisodeDetails } from '../../../hooks/useEpisodes';

export default function EpisodeDetails({ episodeId }) {
  const { episode, loading, error } = useEpisodeDetails(episodeId);

  if (!episodeId) return null;
  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!episode) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{episode.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Bölümdeki Karakterler</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Bu bölümde toplam {episode.characters.length} karakter yer alıyor.
          </p>
        </div>
      </div>
    </div>
  );
} 