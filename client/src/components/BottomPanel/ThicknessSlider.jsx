import React, { useContext } from 'react';
import { PaintbrushSettingsContext } from '../../context/PaintbrushSettingsContext';

function ThicknessSlider() {
  const { thickness, setThickness, maxThickness, minThickness } = useContext(
    PaintbrushSettingsContext
  );

  const changeThickness = (e) => {
    localStorage.setItem('thickness', e.target.value);
    setThickness(e.target.value);
  };

  return (
    <input
      className="thickness-slider"
      type="range"
      min={minThickness}
      max={maxThickness}
      onInput={changeThickness}
      value={thickness}
    />
  );
}

export default ThicknessSlider;
