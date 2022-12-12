import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import { io } from 'socket.io-client';

function Room() {
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleNewChat = (data) => {
    //fetch chat
  };

  useEffect(() => {
    //subscrib when this component is mounted
    const socket = io.connect('http://localhost:8080');

    //upon new chat fetch new chat's
    socket.on('chat', handleNewChat);

    //unsubscrib when the user leave the room
    return () => {
      socket.close();
    };
  }, []);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch('/api/micro_posts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Server error while creating a new post', error);
      setError(true);
    }
  };

  if (success) return <Navigate to="/post/new" />;

  return (
    <div className="chat-container text-start">
      <div className="chat-box">
        <div className="messages">
          <div className="message bg-light p-4">hello</div>
          <div className="message bg-light p-4">hi</div>
        </div>
        {error && <ErrorAlert details={'Failed to save the content'} />}
        <form onSubmit={handleSubmit}>
          <div className="input-user-chat input-group">
            <input
              type="text"
              placeholder="Type here..."
              value={content}
              className="form-control"
              onChange={handleContentChange}
              autoFocus
            />
            <button type="submit" className="room-send-btn btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="user-box">
        <h2 className="text-center">Users</h2>
        <div className="message bg-light p-4">
          <span className="logged-in p-2">●</span>
          kevin
        </div>
        <div className="message bg-light p-4">
          <span className="logged-in p-2">●</span>Khan
        </div>
        <div className="message bg-light p-4">
          <span className="logged-in p-2">●</span>
          Shin
        </div>
        <div className="message bg-light p-4">
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
          className="exit-btn bg-danger text-white text-center "
        >
          <h5>Exit Room</h5>
        </Link>
      </div>
    </div>
  );
}

export default Room;
