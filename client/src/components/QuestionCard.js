import React from 'react';
import AnswerButton from './AnswerButton';

function QuestionCard({ question, options, selectAnswer }) {
  return (
    <>
      <h4>{question}</h4>
      {options.map((option) => (
        <AnswerButton
          key={option}
          value={option}
          handleClick={() => selectAnswer(option)}
        />
      ))}
    </>
  );
}

export default QuestionCard;
