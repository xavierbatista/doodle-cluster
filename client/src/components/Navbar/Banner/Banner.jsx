import React, { useContext } from 'react';
import { ModalContext } from '../../../context/ModalContext';
import './Banner.scss';

function Banner() {
  const { showSignUpModal, showLogInModal } = useContext(ModalContext);

  return (
    <div className="banner">
      <h1>
        <span onClick={showSignUpModal}>Sign Up</span> or{' '}
        <span onClick={showLogInModal}>Log In</span> for free to submit your
        drawing.
      </h1>
    </div>
  );
}

export default Banner;
