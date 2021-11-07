import React, {  useContext } from 'react';
import { CanvasContext } from '../../context/CanvasContext';
import { ModalContext } from '../../context/ModalContext';
import './Sidebar.scss';

function Sidebar() {
  const { previousDrawers } = useContext(CanvasContext);
  const { showViewDrawingModal } = useContext(ModalContext);

  return (
    <div className="sidebar">
      <h2>Previous Drawers</h2>
      <ul className="previous-drawers-list">
        {previousDrawers.map((previousDrawer) => {
          const { id, username, date, img_data: imgData } = previousDrawer;
          return (
            <li key={id}>
              <div>
                <p className="previous-drawer-username">{username}</p>
                <p className="previous-drawing-date">{date.substring(0, 10)}</p>
              </div>
              <div>
                <img
                  src={imgData}
                  alt=""
                  className="previous-drawer-img"
                  onClick={() => showViewDrawingModal(imgData)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
