import React, { useState, useEffect, useRef } from 'react';
import ErrorAlert from '../components/ErrorAlert';

function RoomChat({ chats }) {
  const [chat, setChat] = useState('');
  const [error, setError] = useState(false);
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
          <div key={i}>
            <div className="message bg-light p-1">
              <div className="message">
                {`${chat.User.username}: ${chat.message}`}
                <span className="message-time-sent">
                  {chat.createdAt.slice(11, 19)}
                </span>
              </div>
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
