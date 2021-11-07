import { useContext } from 'react';
import axios from 'axios';
import { CanvasContext } from '../context/CanvasContext';

function useStillUsingCanvas() {
  const { canvasToken } = useContext(CanvasContext);

  const stillUsingCanvas = async () => {
    if (
      canvasToken &&
      localStorage.getItem('token') &&
      localStorage.getItem('username')
    ) {
      const response = await axios({
        method: 'put',
        url: '/still-using-canvas',
        headers: {
          canvasToken,
          token: localStorage.getItem('token'),
        },
      });
    } else {
      return; //do nothing if user isn't logged in
    }
  };

  return stillUsingCanvas;
}

export default useStillUsingCanvas;
