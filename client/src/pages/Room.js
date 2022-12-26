import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import RoomChat from '../components/RoomChat';

function Room() {
  const [users, setUsers] = useState([]);
  const { search } = useLocation();
  const roomId = search.slice(8);
  const onlineUsers = async () => {
    fetch(`/api/rooms/${roomId}/users`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setUsers(body);
      });
  };

  useEffect(() => {
    onlineUsers();
  }, []);

  return (
    <div className="room-container p-0">
      <Quiz />
      <div className="chat-container h-25">
        <div className="chat-container text-start w-100">
          <RoomChat />
          {/*Dummy data to be replaced*/}
          <div className="user-box">
            <h2 className="text-center">Users</h2>
            {users.map((user) => {
              return (
                <div className="message bg-light">
                  <span className="logged-in p-2">●</span>
                  {user.username}
                </div>
              );
            })}
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
