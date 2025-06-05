import React from 'react';
import { CharacterProvider } from './contexts/CharacterContext';
import CharacterTable from './components/CharacterTable/CharacterTable';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import Filters from './components/Filters/Filters';
import TopNav from './components/Layout/TopNav';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <CharacterProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <TopNav />
        <div className="container mx-auto px-4 py-8 flex-1" style={{paddingTop: '56px', paddingBottom: '24px'}}>
          <Filters />
          <CharacterTable />
          <CharacterDetails />
        </div>
        <Footer />
      </div>
    </CharacterProvider>
  );
}

export default App;
