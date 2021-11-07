import React, { createContext, useState, useRef } from 'react';

export const CanvasContext = createContext();

const CanvasProvider = ({ children }) => {
  const [canvasId, setCanvasId] = useState(0);
  const [currentDrawing, setCurrentDrawing] = useState('');
  const [canvasToken, setCanvasToken] = useState('');
  const [previousDrawers, setPreviousDrawers] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const contextValues = {
    canvasId,
    currentDrawing,
    setCurrentDrawing,
    canvasRef,
    contextRef,
    setCanvasId,
    canvasToken,
    setCanvasToken,
    previousDrawers,
    setPreviousDrawers,
  };

  return (
    <CanvasContext.Provider value={contextValues}>
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
