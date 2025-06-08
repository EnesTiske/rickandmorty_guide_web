import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './contexts/CharacterContext';
import { ThemeProvider } from './contexts/ThemeContext';
import CharacterTable from './components/CharacterTable/CharacterTable';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import Filters from './components/Filters/Filters';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home/Home';
import LocationTable from './components/LocationTable/LocationTable';
import './components/layout/Layout.css';

function App() {
  return (
    <ThemeProvider>
      <CharacterProvider>
        <Router>
          <div className="layout bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Header />
            <main className="container mx-auto flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character" element={
                  <>
                    <Filters />
                    <CharacterTable />
                    <CharacterDetails />
                  </>
                } />
                <Route path="/location" element={<LocationTable />} />
                <Route path="/episode" element={<div>Bölümler sayfası yakında...</div>} />
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
