import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-4">Rick & Morty Dünyasına Hoş Geldiniz</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        Karakterler, konumlar ve bölümler hakkında detaylı bilgi edinmek için yukarıdaki menüyü kullanabilirsiniz.
      </p>
    </div>
  );
};

export default Home; 