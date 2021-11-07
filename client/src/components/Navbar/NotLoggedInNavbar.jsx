import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

function NotLoggedInNavbar() {
  const { showSignUpModal, showLogInModal } = useContext(ModalContext);

  return (
    <div className="not-logged-in-navbar">
      <button onClick={showSignUpModal}>Sign Up</button>
      <button onClick={showLogInModal}>Log In</button>
    </div>
  );
}

export default NotLoggedInNavbar;
