import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../../../context/ModalContext';
import useGetUsersRecentDrawings from '../../../utils/useGetUsersRecentDrawings';
import './UsersRecentDrawings.scss';

function UsersRecentDrawings() {
  const {
    hideModal,
    setDrawingBeingViewed,
    setModalShowing,
    usersRecentDrawings,
  } = useContext(ModalContext);
  const getUsersRecentDrawings = useGetUsersRecentDrawings();

  useEffect(() => {
    getUsersRecentDrawings();
  }, []);

  const showViewDrawingModal = (imgData) => {
    setModalShowing('ViewDrawingModal');
    setDrawingBeingViewed(imgData);
  };

  return (
    <div className="background-darken" onMouseDown={hideModal}>
      <div className="users-recent-drawings-container">
        <h2 className="users-recent-drawings-header">Your Recent Drawings</h2>
        <div className="users-recent-drawings">
          {usersRecentDrawings.map((recentDrawing) => {
            const { id, img_data: imgData } = recentDrawing;
            return (
              <img
                onClick={() => showViewDrawingModal(imgData)}
                key={id}
                src={imgData}
                className="recent-drawing"
                alt="recent drawing"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersRecentDrawings;
