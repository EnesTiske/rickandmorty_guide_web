import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './contexts/CharacterContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocationProvider } from './contexts/LocationContext';
import CharacterTable from './components/character/Table/CharacterTable';
import CharacterDetails from './components/character/Details/CharacterDetails';
import Filters from './components/character/Filters/Filters';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home/Home';
import LocationTable from './components/location/Table/LocationTable';
import EpisodeTable from './components/episode/Table/EpisodeTable';
import EpisodeDetails from './components/episode/Details/EpisodeDetails';
import './components/layout/Layout.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CharacterProvider>
        <Router>
          <div className="layout bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Header />
            <main className="main-container mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character" element={
                  <>
                    <Filters />
                    <CharacterTable />
                    <CharacterDetails />
                  </>
                } />
                <Route path="/location" element={
                  <LocationProvider>
                    <LocationTable />
                  </LocationProvider>
                } />
                <Route path="/episode" element={
                  <>
                    <EpisodeTable />
                    <EpisodeDetails />
                  </>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CharacterProvider>
    </ThemeProvider>
  );
}

export default App;
