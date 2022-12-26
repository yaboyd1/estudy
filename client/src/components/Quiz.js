import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import QuestionCard from '../components/QuestionCard';
import { shuffleArray } from '../lib/shuffleArray';
import rawTriviaQuestion from '../lib/data';

function Quiz() {
  const triviaQuestion = rawTriviaQuestion.results[0];
  const [questionData, setQuestionData] = useState(triviaQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [count, setCount] = useState(0);

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

  return (
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
  );
}

export default Quiz;
