import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const getRandomId = () => Math.floor(Math.random() * 826 + 1);

const Home = () => {
  // 4 farklı random karakter için state
  const [randomCharacters, setRandomCharacters] = useState([null, null, null, null]);

  useEffect(() => {
    const ids = [];
    while (ids.length < 4) {
      const id = getRandomId();
      if (!ids.includes(id)) ids.push(id);
    }
    Promise.all(
      ids.map(id => fetch(`https://rickandmortyapi.com/api/character/${id}`).then(res => res.json()))
    ).then(data => setRandomCharacters(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      {/* Banner veya Portal */}

      <h1 className="text-4xl font-bold mb-2 text-center">Rick & Morty Karakter Rehberi</h1>
      <h2 className="text-lg text-primary-light dark:text-primary-dark mb-6 text-center">Evrenler arası bilgi merkezi!</h2>
      {/* Ana Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-8">
        <Link to="/character" className="home-card flex flex-col items-center p-6 rounded-xl shadow-lg hover:scale-105 transition group bg-white" style={{ backgroundColor: '#CCE2EF' }}>
          {randomCharacters[0] && (
            <img src={randomCharacters[0].image} alt={randomCharacters[0].name} className="w-40 h-40 mb-1" />
          )}
          <span className="font-semibold text-lg mb-1">Karakterler</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Tüm karakterleri keşfet</span>
        </Link>
        <Link to="/location" className="home-card flex flex-col items-center p-6 rounded-xl shadow-lg hover:scale-105 transition group bg-white" style={{ backgroundColor: '#CCE2EF' }}>
          {randomCharacters[1] && (
            <img src={randomCharacters[1].image} alt={randomCharacters[1].name} className="w-40 h-40 mb-1" />
          )}
          <span className="font-semibold text-lg mb-1">Konumlar</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Evrenler, boyutlar ve gezegenler</span>
        </Link>
        <Link to="/episode" className="home-card flex flex-col items-center p-6 rounded-xl shadow-lg hover:scale-105 transition group bg-white" style={{ backgroundColor: '#CCE2EF' }}>
          {randomCharacters[2] && (
            <img src={randomCharacters[2].image} alt={randomCharacters[2].name} className="w-40 h-40 mb-1" />
          )}
          <span className="font-semibold text-lg mb-1">Bölümler</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Tüm sezon ve bölümler</span>
        </Link>
      </div>
      {/* Rastgele Karakter */}
      {randomCharacters[3] && (
        <div className="mb-8 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Bugünün Karakteri</h3>
          <img src={randomCharacters[3].image} alt={randomCharacters[3].name} className="w-20 h-20 rounded-full mb-1 border-4 border-primary-light dark:border-primary-dark" />
          <span className="font-medium">{randomCharacters[3].name}</span>
        </div>
      )}
      {/* Kısa Bilgilendirici Alan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <span className="text-2xl mb-2">🔍</span>
          <span className="text-sm text-gray-600 dark:text-gray-300 text-center">Filtreleme ve arama ile istediğini bul</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl mb-2">🌗</span>
          <span className="text-sm text-gray-600 dark:text-gray-300 text-center">Koyu/açık tema desteği</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl mb-2">📚</span>
          <span className="text-sm text-gray-600 dark:text-gray-300 text-center">Her karakterin detayında, yer aldığı bölümleri görebilirsin</span>
        </div>
      </div>
      {/* Alt Bilgi ve Linkler */}
      <div className="text-center text-xs text-gray-400">
        Veriler <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="underline">Rick & Morty API</a> üzerinden alınmaktadır.
      </div>
    </div>
  );
};

export default Home; 