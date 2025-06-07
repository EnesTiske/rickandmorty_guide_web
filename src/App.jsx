import React from 'react';
import { CharacterProvider } from './contexts/CharacterContext';
import { ThemeProvider } from './contexts/ThemeContext';
import CharacterTable from './components/CharacterTable/CharacterTable';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import Filters from './components/Filters/Filters';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './components/layout/Layout.css';

function App() {
  return (
    <ThemeProvider>
      <CharacterProvider>
        <div className="layout bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
          <Header />
          <main className="container mx-auto flex-1">
            <Filters />
            <CharacterTable />
            <CharacterDetails />
          </main>
          <Footer />
        </div>
      </CharacterProvider>
    </ThemeProvider>
  );
}

export default App;
