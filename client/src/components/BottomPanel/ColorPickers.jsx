import React, { useContext } from 'react';
import { PaintbrushSettingsContext } from '../../context/PaintbrushSettingsContext';

function ColorPickers() {
  const { color, setColor } = useContext(PaintbrushSettingsContext);

  const changeColor = (e) => {
    localStorage.setItem('color', e.target.value);
    setColor(e.target.value);
  };

  return (
    <>
      <div className="colors">
        <button
          className="black"
          value="#000000"
          onClick={changeColor}
        ></button>
        <button className="red" value="#d61f1f" onClick={changeColor}></button>
        <button
          className="orange"
          value="#ff7f00"
          onClick={changeColor}
        ></button>
        <button
          className="yellow"
          value="#e4d00a"
          onClick={changeColor}
        ></button>
        <button
          className="green"
          value="#29C23B"
          onClick={changeColor}
        ></button>
        <button className="blue" value="#0079ff" onClick={changeColor}></button>
        <button
          className="purple"
          value="#a800ff"
          onClick={changeColor}
        ></button>
      </div>
      <input
        className="color-picker"
        value={color}
        type="color"
        onInput={changeColor}
      />
    </>
  );
}

export default ColorPickers;
