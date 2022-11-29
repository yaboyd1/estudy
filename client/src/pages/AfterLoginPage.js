import React from 'react';
import { useNavigate } from 'react-router-dom';

function AfterLoginPage() {
  let navigate = useNavigate();
  const redirectCreateRoom = () => {
    let path = '/create-room';
    navigate(path);
  };
  return (
    <div className="session-options">
      <div className="session-options">
        <button onClick={redirectCreateRoom} className="btn-session rounded ">
          Create new room
        </button>
      </div>
      <div className="session-options">
        <button className="btn-session rounded">Enter an existing room</button>
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
