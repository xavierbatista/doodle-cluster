import React, { useState, useContext } from 'react';
import { CanvasContext } from '../../context/CanvasContext';
import { VerifyDrawingContext } from '../../context/VerifyDrawingContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { ModalContext } from '../../context/ModalContext';
import axios from 'axios';
import useGetCanvas from '../../utils/useGetCanvas';
import useDoneUsingCanvas from '../../utils/useDoneUsingCanvas';

function SubmitButton() {
  const { currentDrawing, canvasToken } = useContext(CanvasContext);
  const { drawingVerifiedForSubmission, setNumberOfChangesUserMade } =
    useContext(VerifyDrawingContext);
  const { isLoggedIn } = useContext(UserInfoContext);
  const { showSignUpModal } = useContext(ModalContext);
  const [disabled, setDisabled] = useState(false);
  const getCanvas = useGetCanvas();
  const doneUsingCanvas = useDoneUsingCanvas();

  //submits drawing
  const handleSubmit = async () => {
    if (!isLoggedIn) showSignUpModal();
    else {
      setDisabled(true);
      try {
        if (drawingVerifiedForSubmission) {
          await axios({
            method: 'put',
            url: '/canvas',
            data: {
              imgData: currentDrawing,
            },
            headers: {
              canvasToken: canvasToken,
              token: localStorage.getItem('token'),
            },
          });
        }
      } catch (error) {
        console.error(error.message);
      }

      //get another canvas
      getCanvas();
      setNumberOfChangesUserMade(0);

      setTimeout(() => {
        setDisabled(false);
      }, 300);
    }
  };

  return (
    <button className="submit" disabled={disabled} onClick={handleSubmit}>
      Submit Drawing
    </button>
  );
}

export default SubmitButton;
