import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themePalettes = {
  champagne: {
    name: 'champagne',
    label: 'Champagne',
    title: 'Champagne Ivory',
    bg: 0xece6dc,
    sun: 0xffecd0,
    hemiSky: 0xf4ede2,
    hemiGround: 0xa99b8a,
    gold: 0xc5a059,
    floor: 0xece6dc,
    exposure: 1.16,
  },
  noir: {
    name: 'noir',
    label: 'Noir',
    title: 'Midnight Noir',
    bg: 0x141514,
    sun: 0xffd992,
    hemiSky: 0x3a3d3c,
    hemiGround: 0x141514,
    gold: 0xdfb96b,
    floor: 0x1a1c1b,
    exposure: 1.28,
  },
  bronze: {
    name: 'bronze',
    label: 'Bronze',
    title: 'Imperial Bronze',
    bg: 0xeae0d3,
    sun: 0xffe2cb,
    hemiSky: 0xf3e8dc,
    hemiGround: 0x8b776a,
    gold: 0xbd7344,
    floor: 0xeae0d3,
    exposure: 1.15,
  },
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('champagne');

  const setTheme = (themeName) => {
    if (themePalettes[themeName]) {
      setThemeState(themeName);
      document.documentElement.setAttribute('data-theme', themeName);
      localStorage.setItem('aurelia_theme', themeName);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('aurelia_theme');
    if (saved && themePalettes[saved]) {
      setThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'champagne');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentPalette: themePalettes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

