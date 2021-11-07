import { useContext } from 'react';
import { UserInfoContext } from '../context/UserInfoContext';

function useLogout() {
  const { setIsLoggedIn, setUsername } = useContext(UserInfoContext);

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload(false);
  };

  return logout;
}

export default useLogout;
