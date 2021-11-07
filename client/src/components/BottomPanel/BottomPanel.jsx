import React, { useContext, useEffect } from 'react';
import './BottomPanel.scss';
import SubmitButton from './SubmitButton';
import ColorPickers from './ColorPickers';
import ThicknessSlider from './ThicknessSlider';
import { CanvasContext } from '../../context/CanvasContext';
import { PaintbrushSettingsContext } from '../../context/PaintbrushSettingsContext';

function BottomPanel() {
  const { canvasRef, contextRef, canvasId } = useContext(CanvasContext);
  const { color, thickness } = useContext(PaintbrushSettingsContext);

  //update canvas to new brush settings
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = thickness;
    contextRef.current = context;
  }, [color, thickness]);

  return (
    <div className="bottom-panel">
      <h3 className="canvas-id">Canvas ID: {canvasId !== 0 && canvasId}</h3>
      <div className="tools">
        <ColorPickers />
        <ThicknessSlider />
      </div>
      <SubmitButton />
    </div>
  );
}

export default BottomPanel;
