import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';

function Room() {
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
          <div className="input-group">
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
          <span class="logged-in p-2">●</span>
          hello
        </div>
        <div className="message bg-light p-4">
          <span class="logged-in p-2">●</span>hi
        </div>
        <div className="message bg-light p-4">
          <span class="logged-in p-2">●</span>
          hi
        </div>
        <div className="message bg-light p-4">
          <span
            class="logged-in p-2
          "
          >
            ●
          </span>
          hi
        </div>
      </div>
    </div>
  );
}

export default Room;
