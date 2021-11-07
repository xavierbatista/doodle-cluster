import React, { useEffect, useState, useContext } from 'react';
import './Canvas.scss';
import { CanvasContext } from '../../context/CanvasContext';
import { PaintbrushSettingsContext } from '../../context/PaintbrushSettingsContext';
import { VerifyDrawingContext } from '../../context/VerifyDrawingContext';

function Canvas() {
  const { setCurrentDrawing, canvasRef, contextRef } =
    useContext(CanvasContext);
  const { color, thickness } = useContext(PaintbrushSettingsContext);
  const { numberOfChangesUserMade, setNumberOfChangesUserMade } =
    useContext(VerifyDrawingContext);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    //initial canvas settings
    const canvas = canvasRef.current;
    canvas.width = 1280;
    canvas.height = 570;

    const context = canvas.getContext('2d');

    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.strokeStyle = color;
    context.lineWidth = thickness;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    //checking for left click
    if (nativeEvent.buttons === 1) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);

      //makes dot
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setIsDrawing(true);
      setCurrentDrawing(canvasRef.current.toDataURL()); //updates current drawing

      setNumberOfChangesUserMade(numberOfChangesUserMade + 1);
    }
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setCurrentDrawing(canvasRef.current.toDataURL()); //updates current drawing
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.stroke();
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  return (
    <>
      <canvas
        className="main-canvas"
        onMouseDown={startDrawing}
        onMouseOver={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseOut={stopDrawing}
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default Canvas;
