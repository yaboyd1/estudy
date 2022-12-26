import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import RoomChat from '../components/RoomChat';

function Room() {
  const [users, setUsers] = useState([]);

  const onlineUsers = async (users) => {
    fetch(`/api/rooms/${users}`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setUsers(JSON.parse(body));
      });
  };

  return (
    <div className="room-container p-0">
      <Quiz />
      <div class="chat-container h-25">
        <div className="chat-container text-start w-100">
          <RoomChat />
          {/*Dummy data to be replaced*/}
          <div className="user-box">
            <h2 className="text-center">Users</h2>
            <div className="message bg-light">
              <span className="logged-in p-2">●</span>
              kevin
            </div>
            <div className="message bg-light">
              <span className="logged-in p-2">●</span>Khan
            </div>
            <div className="message bg-light">
              <span className="logged-in p-2">●</span>
              Shin
            </div>
            <div className="message bg-light">
              <span
                className="logged-in p-2
            "
              >
                ●
              </span>
              Dewan
            </div>
            <Link
              to="/session"
              className="exit-btn bg-danger text-white text-center mb-0 "
            >
              <h5>Exit Room</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
