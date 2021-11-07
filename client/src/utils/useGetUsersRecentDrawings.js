import { useContext } from 'react';
import axios from 'axios';
import { ModalContext } from '../context/ModalContext';

function useGetUsersRecentDrawings() {
  const { setUsersRecentDrawings } = useContext(ModalContext);

  const getUsersRecentDrawings = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/users-recent-drawings',
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setUsersRecentDrawings(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return getUsersRecentDrawings;
}

export default useGetUsersRecentDrawings;
