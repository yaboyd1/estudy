import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import ErrorAlert from '../components/ErrorAlert';

function RoomChat() {
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState('');
  const [error, setError] = useState(false);
  const { search } = useLocation();
  const roomId = search.slice(8);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const fetchPrevChats = () => {
    fetch(`/api/room_chats/${roomId}`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setChats(JSON.parse(body));
      });
  };

  useEffect(() => {
    //fetch all chats
    fetchPrevChats();

    //subscribe when the user enters the room
    const socket = io.connect('http://localhost:8080');
    socket.on(`chat${roomId}`, handleNewChat);

    //unsubscribe when the user leaves the room
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleNewChat = (chat, callback) => {
    setChats((prevChats) => [...prevChats, chat]);
  };

  const handleChatChange = (event) => {
    setChat(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setChat('');
    try {
      let response = await fetch('/api/room_chats/', {
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
        {chats.map((chat) => (
          <>
            <div className="message bg-light p-1">
              {`${chat.User.username}: ${chat.message}`}
              <div>{chat.createdAt}</div>
            </div>
          </>
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
