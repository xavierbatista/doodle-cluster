import React, { useState, useContext } from 'react';
import './FormModal.scss';
import { ModalContext } from '../../../context/ModalContext';
import { UserInfoContext } from '../../../context/UserInfoContext';
import axios from 'axios';

function LogInModal() {
  const { hideModal, showSignUpModal } = useContext(ModalContext);
  const { setIsLoggedIn, setUsername } = useContext(UserInfoContext);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const response = await axios.post('/auth/login', {
      ...inputs,
    });

    const { token } = response.data;
    const { username } = response.data;

    if (token) {
      setIsLoggedIn(true);
      hideModal();
      setUsername(username);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      window.location.reload(false);
    }
  };

  return (
    <div className="background-darken" onMouseDown={hideModal}>
      <div className="form-modal">
        <h1>Log in</h1>
        <div className="wrong-modal">
          <h2>Don't have an account?</h2>
          <h2 className="log-in" onClick={showSignUpModal}>
            Sign up
          </h2>
        </div>
        <form onSubmit={handleSubmitForm}>
          <input
            type="email"
            placeholder="Email"
            className="email-input"
            maxLength="255"
            name="email"
            value={email}
            onChange={onChange}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="password-input"
            name="password"
            maxLength="255"
            value={password}
            onChange={onChange}
          />
          <input type="submit" className="submit-button" value="Log In" />
        </form>
      </div>
    </div>
  );
}

export default LogInModal;
