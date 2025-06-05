import React, { createContext, useContext } from 'react';
import { useCharacters } from '../hooks/useCharacters';

const CharacterContext = createContext();

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};

export const CharacterProvider = ({ children }) => {
  const characterData = useCharacters();

  return (
    <CharacterContext.Provider value={characterData}>
      {children}
    </CharacterContext.Provider>
  );
}; 