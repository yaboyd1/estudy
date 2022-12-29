import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import QuestionCard from '../components/QuestionCard';
import { shuffleArray } from '../lib/shuffleArray';
import rawTriviaQuestion from '../lib/data';

const triviaQuestion = rawTriviaQuestion.results[0];

function Quiz() {
  const [questionData, setQuestionData] = useState(triviaQuestion);
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState(questionData.correct_answer);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
    if (selection === answer) {
      setCount(count + 1);
    }
  };

  let card;

  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={answer}
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
        answer={answer}
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
        setAnswer(body.results[0].correct_answer);
      });
  };

  return (
    <div className="quiz-container p-0 h-75">
      <div className="quiz w-100 h-100 d-flex bg-light">
        <div className="row quiz-board">
          <h2 className="text-start fs-3 my-3">Trivia Quiz</h2>
          <hr />
          {card}
        </div>
        <button
          onClick={getQuestion}
          className="btn-next-question btn btn-success mb-4"
        >
          Next Question
        </button>
        <div className="count">Score:{count}</div>
      </div>
    </div>
  );
}

export default Quiz;
