import React from 'react';
import { useNavigate } from 'react-router-dom';

function AfterLoginPage() {
  let navigate = useNavigate();
  const redirectCreateRoom = () => {
    let path = '/create-room';
    navigate(path);
  };

  const redirectListOfRooms = () => {
    let path = '/rooms';
    navigate(path);
  };

  return (
    <div className="session-options mt-3">
      <div className="session-options">
        <button onClick={redirectCreateRoom} className="btn-session rounded ">
          New Room
        </button>
      </div>
      <div className="session-options">
        <button onClick={redirectListOfRooms} className="btn-session rounded">
          Join Room
        </button>
      </div>
      <div className="session-options">
        <button className="btn-session rounded">Achievements</button>
      </div>
      <div className="session-options">
        <button className="btn-session rounded">Friends</button>
      </div>
      <div className="session-options">
        <button className="btn-session rounded">Testing</button>
      </div>
    </div>
  );
}

export default AfterLoginPage;
