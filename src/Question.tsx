import React from 'react';
import { UserResponse } from './Questionaire';
import { Question } from './data/questions';
const Question: React.FC<{
  question: Question;
  setState: React.Dispatch<React.SetStateAction<UserResponse[]>>;
  state: UserResponse[];
}> = ({ question, setState, state }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = [...state];
    newState[question.id] = { value: e.target.value };
    setState(newState);
  };
  return (
    <li style={{ marginBottom: 15 }}>
      <div>{question.text}</div>
      <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
        {question.answers.map((a, i) => (
          <div key={i}>
            <input
              type="radio"
              onChange={handleChange}
              name={question.text}
              value={a.letter}
            />
            <label htmlFor={a.value}>{a.value}</label>
          </div>
        ))}
      </div>
    </li>
  );
};

export default Question;
