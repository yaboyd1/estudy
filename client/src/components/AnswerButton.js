import React from 'react';

function AnswerButton({ value, handleClick }) {
  return (
    <button
      className="quiz-btn btn btn-primary w-100 mt-4"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default AnswerButton;
