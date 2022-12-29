import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';

function RoomChat({
  chats
}) {
  const [chat, setChat] = useState('');
  const [error, setError] = useState(false);
  const { search } = useLocation();
  const roomId = search.slice(8);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleChatChange = (event) => {
    setChat(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setChat('');
    try {
      await fetch('/api/room_chats/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: chat,
        }),
      });
    } catch (error) {
      console.error('Server error while creating a new post', error);
      setError(true);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {chats.map((chat, i) => (
          <div key={i} className="message d-flex justify-content-between align-items-end bg-light p-1">
            <div className="message-content">
              {`${chat.User.username}: ${chat.message}`}
            </div>
            <div className="message-time">
                {/*hour*/chat.createdAt.split('T')[1].split(':').slice(0, 1)}:
                {/*minute*/chat.createdAt.split('T')[1].split(':').slice(1, 2)}
            </div>
          </div>
        ))}
        <div className="chat-box-end-ref" ref={messagesEndRef} />
      </div>

      {error && <ErrorAlert details={'Failed to save the content'} />}

      <form id="form-chat" onSubmit={handleSubmit}>
        <div className="input-user-chat input-group">
          <input
            autoComplete="off"
            id="input-chat-bar"
            name="chat-message"
            type="text"
            placeholder="Type here..."
            value={chat}
            className="form-control"
            onChange={handleChatChange}
            autoFocus
          />
          <button type="submit" className="room-send-btn btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default RoomChat;
