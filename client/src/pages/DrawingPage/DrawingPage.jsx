import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Canvas from '../../components/Canvas/Canvas';
import Sidebar from '../../components/Sidebar/Sidebar';
import BottomPanel from '../../components/BottomPanel/BottomPanel';
import './DrawingPage.scss';
import SignUpModal from '../../components/Modals/FormModals/SignUpModal';
import LogInModal from '../../components/Modals/FormModals/LogInModal';
import ViewDrawingModal from '../../components/Modals/ViewDrawingModal/ViewDrawingModal';
import UsersRecentDrawings from '../../components/Modals/UsersPreviousDrawingsModal/UsersRecentDrawings';
import { ModalContext } from '../../context/ModalContext';
import useGetCanvas from '../../utils/useGetCanvas';
import useDoneUsingCanvas from '../../utils/useDoneUsingCanvas';
import useStillUsingCanvas from '../../utils/useStillUsingCanvas';
import useInterval from '../../utils/useInterval';

function DrawingScreen() {
  const getCanvas = useGetCanvas();
  const doneUsingCanvas = useDoneUsingCanvas();
  const { modalShowing } = useContext(ModalContext);
  const stillUsingCanvas = useStillUsingCanvas();

  //Tells server that the canvas is open when they refresh the page
  window.onbeforeunload = () => {
    doneUsingCanvas();
  };

  //loads new canvas on startup
  useEffect(() => {
    getCanvas();
  }, []);

  //tells server the canvas is still being used every 10 seconds
  useInterval(() => {
    stillUsingCanvas();
  }, 10000);

  return (
    <>
      <div className="main-area">
        <Navbar />
        <Canvas />
        <BottomPanel />
      </div>

      <Sidebar />

      {modalShowing === 'SignUpModal' && <SignUpModal />}
      {modalShowing === 'LogInModal' && <LogInModal />}
      {modalShowing === 'ViewDrawingModal' && <ViewDrawingModal />}
      {modalShowing === 'UsersRecentDrawings' && <UsersRecentDrawings />}
    </>
  );
}

export default DrawingScreen;
