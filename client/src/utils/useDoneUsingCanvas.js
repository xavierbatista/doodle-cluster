import { useContext } from 'react';
import { CanvasContext } from '../context/CanvasContext';
import axios from 'axios';

function useDoneUsingCanvas() {
  const { canvasToken } = useContext(CanvasContext);

  const doneUsingCanvas = async () => {
    //only works if user is logged in
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
      const response = await axios({
        method: 'put',
        url: '/done-using-canvas',
        headers: {
          canvasToken,
          token: localStorage.getItem('token'),
        },
      });
    }
  };

  return doneUsingCanvas;
}

export default useDoneUsingCanvas;
