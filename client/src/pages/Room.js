import React, { useState, useEffect, useRef } from 'react';
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
  const messagesEndRef = useRef(null);

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

    //subscrib when the user enters the room
    const socket = io.connect('http://localhost:8080');

    //upon new chat recieve the new chat's
    socket.on(`chat${roomId}`, handleNewChat);

    //unsubscrib when the user leaves the room
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  },[chats])

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
    <div className="room-container p-0">
      <div class="quiz-container p-0 h-75">
        <div className="quiz w-100 h-100 d-flex justify-content-center align-items-center bg-light">
          <div className="quiz-board" style={{ maxWidth: '45%' }}>
            <h2 className="text-center my-4">Trivia Quiz</h2>
            <button onClick={getQuestion} className="btn btn-success mb-4">
              Next Question
            </button>
            {card}
            <br />
            <br />
          </div>
          <div className="count text-end">Score: {count}</div>
        </div>
      </div>
      <div class="chat-container h-25">
        <div className="chat-container text-start w-100">
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
              <div ref={messagesEndRef} />
            </div>

            {error && <ErrorAlert details={'Failed to save the content'} />}

            <form id="form-chat" onSubmit={handleSubmit}>
              <div className="input-user-chat input-group">
                <input
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
