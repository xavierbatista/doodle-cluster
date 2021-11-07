import React, {  useContext } from 'react';
import { ModalContext } from '../../../context/ModalContext';
import './ViewDrawingModal.scss';

function ViewImageModal() {
  const { hideModal, drawingBeingViewed } = useContext(ModalContext);
  return (
    <div className="background-darken" onMouseDown={hideModal}>
      <div className="view-drawing-modal">
        <img src={drawingBeingViewed} alt="" />
      </div>
    </div>
  );
}

export default ViewImageModal;
