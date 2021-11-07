import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CanvasProvider from './context/CanvasContext';
import PaintBrushProvider from './context/PaintbrushSettingsContext';
import VerifyDrawingProvider from './context/VerifyDrawingContext';
import ModalProvider from './context/ModalContext';
import UserInfoProvider from './context/UserInfoContext';

ReactDOM.render(
  <CanvasProvider>
    <PaintBrushProvider>
      <VerifyDrawingProvider>
        <ModalProvider>
          <UserInfoProvider>
            <App />
          </UserInfoProvider>
        </ModalProvider>
      </VerifyDrawingProvider>
    </PaintBrushProvider>
  </CanvasProvider>,
  document.getElementById('root')
);
