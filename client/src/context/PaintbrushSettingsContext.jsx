import React, { useState, createContext, useEffect } from 'react';

export const PaintbrushSettingsContext = createContext();

const PaintbrushSettingsProvider = ({ children }) => {
  const [color, setColor] = useState(localStorage.getItem('color'));
  const [thickness, setThickness] = useState(7.5);
  const maxThickness = 20;
  const minThickness = 1;

  useEffect(() => {
    //checks if user tampered with localStorage thickness
    const localStorageThickness = localStorage.getItem('thickness');
    if (localStorageThickness) {
      if (localStorageThickness > maxThickness) {
        setThickness(maxThickness);
        localStorage.setItem('thickness', maxThickness);
      } else if (localStorageThickness < minThickness) {
        setThickness(minThickness);
        localStorage.setItem('thickness', minThickness);
      } else setThickness(localStorageThickness);
    }
  }, []);

  const contextValues = {
    color,
    setColor,
    thickness,
    setThickness,
    maxThickness,
    minThickness,
  };

  return (
    <PaintbrushSettingsContext.Provider value={contextValues}>
      {children}
    </PaintbrushSettingsContext.Provider>
  );
};

export default PaintbrushSettingsProvider;
