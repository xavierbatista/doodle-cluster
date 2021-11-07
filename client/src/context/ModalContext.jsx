import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalShowing, setModalShowing] = useState('');
  const [drawingBeingViewed, setDrawingBeingViewed] = useState('');
  const [usersRecentDrawings, setUsersRecentDrawings] = useState([]);

  //if you click any area that isn't the modal, it closes the modal
  const hideModal = (e) => {
    if (e) {
      //used to close open modals if the black area clicked
      if (e.target === e.currentTarget) setModalShowing('');
    } else {
      setModalShowing('');
    }
  };

  const showSignUpModal = () => {
    setModalShowing('SignUpModal');
  };

  const showLogInModal = () => {
    setModalShowing('LogInModal');
  };

  const showViewDrawingModal = (imgData) => {
    setModalShowing('ViewDrawingModal');
    setDrawingBeingViewed(imgData);
  };

  const showUsersRecentDrawings = () => {
    setModalShowing('UsersRecentDrawings');
  };

  const contextValues = {
    modalShowing,
    setModalShowing,
    hideModal,
    showSignUpModal,
    showLogInModal,
    showViewDrawingModal,
    drawingBeingViewed,
    setDrawingBeingViewed,
    showUsersRecentDrawings,
    usersRecentDrawings,
    setUsersRecentDrawings,
  };

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
