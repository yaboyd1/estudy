import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import { io } from 'socket.io-client';
import ResultCard from '../components/ResultCard';
import QuestionCard from '../components/QuestionCard';
import { shuffleArray } from '../lib/shuffleArray';
import rawTriviaQuestion from '../lib/data';

const triviaQuestion = rawTriviaQuestion.results[0];

function Room() {
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState('');
  const [error, setError] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);
  const [count, setCount] = useState(0);
  const { search } = useLocation();
  const roomId = search.slice(8);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  let card;

  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else {
    let options = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    card = (
      <QuestionCard
        question={questionData.question}
        options={shuffleArray(options)}
        selectAnswer={selectAnswer}
      />
    );
  }

  const getQuestion = () => {
    fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple')
      .then((res) => res.json())
      .then((body) => {
        setQuestionData(body.results[0]);
        setSelectedAnswer(null);
      });
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

    //subscrib when the user enters the room
    const socket = io.connect('http://localhost:8080');

    //upon new chat recieve the new chat's
    socket.on(`chat${roomId}`, handleNewChat);

    //unsubscrib when the user leaves the room
    return () => {
      socket.close();
    };
  }, []);

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
    <>
      <div className="quiz w-100 my-5 d-flex justify-content-center align-items-center bg-light">
        <div className="quiz-board" style={{ maxWidth: '45%' }}>
          <h1 className="text-center mb-4">Trivia Quiz</h1>
          <button onClick={getQuestion} className="btn btn-success mt-4 mb-4">
            Next Question
          </button>
          {card}
          <br />
          <br />
        </div>
        <div className="count text-end">Score: {count}</div>
      </div>
      <div className="chat-container text-start">
        <div className="chat-box">
          <div className="messages">
            {chats.map((chat) => (
              <>
                <div className="message bg-light p-4">
                  {`${chat.User.username}: ${chat.message}`}
                  <div>{chat.createdAt}</div>
                </div>
              </>
            ))}
          </div>
          {error && <ErrorAlert details={'Failed to save the content'} />}
          <form id="form-chat" onSubmit={handleSubmit}>
            <div className="input-user-chat input-group">
              <input
                id="input-chat-bar"
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
            className="exit-btn bg-danger text-white text-center mb-0 "
          >
            <h5>Exit Room</h5>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Room;
