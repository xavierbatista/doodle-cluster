import { useContext } from 'react';
import axios from 'axios';
import { CanvasContext } from '../context/CanvasContext';
import { UserInfoContext } from '../context/UserInfoContext';

function useGetCanvas() {
  const {
    setCurrentDrawing,
    setCanvasId,
    contextRef,
    canvasRef,
    setCanvasToken,
    setPreviousDrawers,
  } = useContext(CanvasContext);

  const { isLoggedIn } = useContext(UserInfoContext);

  const getCanvas = async () => {
    let response;
    //if the user is logged in, it sends changes the route
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      response = await axios.get('/canvas', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
    } else {
      response = await axios.get('/canvas/new-user-canvas');
    }

    const {
      imgData: pastDrawing,
      canvasId,
      canvasToken,
      previousDrawers,
    } = response.data;

    setCanvasToken(canvasToken);
    previousDrawers && setPreviousDrawers(previousDrawers);

    //clears the canvas so it can display the new one
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    //sets the canvas
    let img = new Image();
    img.src = pastDrawing;
    img.onload = () => {
      contextRef.current.drawImage(img, 0, 0);
    };

    setCurrentDrawing(pastDrawing);
    setCanvasId(canvasId);
  };

  return getCanvas;
}

export default useGetCanvas;
