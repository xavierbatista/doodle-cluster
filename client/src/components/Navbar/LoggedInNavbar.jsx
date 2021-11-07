import React, { useContext } from 'react';
import { UserInfoContext } from '../../context/UserInfoContext';
import { ModalContext } from '../../context/ModalContext';
import useLogout from '../../utils/useLogout';

function LoggedInNavbar() {
  const { username, setIsLoggedIn, setUsername } = useContext(UserInfoContext);
  const { showUsersRecentDrawings } = useContext(ModalContext);
  const logout = useLogout();

  const onClick = () => {};

  return (
    <div className="logged-in-navbar">
      <button onClick={showUsersRecentDrawings}>Recent Drawings</button>
      <button onClick={onClick} className="username-button">{username}</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default LoggedInNavbar;
