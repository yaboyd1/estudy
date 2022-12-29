import React from 'react';
import AnswerButton from './AnswerButton';

function QuestionCard({ question, options, selectAnswer }) {
  return (
    <>
      <div className="quiz-questions">
        <h4 className="quiz-question">
          <span
            style={{ color: '#7f5af0', fontSize: '1.5rem', marginRight: '5px' }}
          >
            Q.
          </span>
          {question}
        </h4>
      </div>
      <div className="quiz-btns">
        {options.map((option) => (
          <AnswerButton
            key={option}
            value={option}
            handleClick={() => selectAnswer(option)}
          />
        ))}
      </div>
    </>
  );
}

export default QuestionCard;
