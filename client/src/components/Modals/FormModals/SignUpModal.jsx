import React, { useState, useContext } from 'react';
import './FormModal.scss';
import { ModalContext } from '../../../context/ModalContext';
import { UserInfoContext } from '../../../context/UserInfoContext';
import axios from 'axios';

function SignUpModal() {
  const { hideModal, showLogInModal } = useContext(ModalContext);
  const { setIsLoggedIn, setUsername } = useContext(UserInfoContext);

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const response = await axios.post('/auth/signup', {
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
        <h1>Sign Up</h1>
        <div className="wrong-modal">
          <h2>Already have an account?</h2>
          <h2 className="log-in" onClick={showLogInModal}>
            Log In
          </h2>
        </div>
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Username"
            className="username-input"
            name="username"
            maxLength="20"
            value={username}
            onChange={onChange}
            autoFocus
          />
          <input
            type="email"
            placeholder="Email"
            className="email-input"
            maxLength="255"
            name="email"
            onChange={onChange}
            value={email}
          />
          <input
            type="text"
            placeholder="Password"
            className="password-input"
            maxLength="255"
            name="password"
            onChange={onChange}
            value={password}
          />
          <input type="submit" className="submit-button" value="Sign Up" />
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
