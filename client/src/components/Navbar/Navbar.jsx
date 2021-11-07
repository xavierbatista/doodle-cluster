import React, { useContext } from 'react';
import { UserInfoContext } from '../../context/UserInfoContext';
import './Navbar.scss';
import logo from '../../assets/logo.png';
import Banner from './Banner/Banner';

import NotLoggedInNavbar from './NotLoggedInNavbar';
import LoggedInNavbar from './LoggedInNavbar';

function Navbar() {
  const { isLoggedIn } = useContext(UserInfoContext);

  return (
    <nav>
      {!isLoggedIn && <Banner />}
      <img src={logo} alt="DoodleCluster" className="logo" />
      {isLoggedIn ? <LoggedInNavbar /> : <NotLoggedInNavbar />}
    </nav>
  );
}

export default Navbar;
