import React, { useEffect, useState } from 'react';
import { db } from './data/firebaseConfig';
import { Question } from './data/questions';
import { UserResponse } from './Questionaire';

interface userData {
  name: string;
  responses: UserResponse[];
  score?: number;
}

const Leaderboard = ({ name }: { name: string }) => {
  const [answers, setAnswers] = useState<UserResponse[]>([]);
  const [results, setResults] = useState<userData[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<userData[]>([]);

  useEffect(() => {
    let unsubscribeQuestions: () => void;
    let unsubscribeResponses: () => void;

    const setupListeners = async () => {
      // Set up realtime listener for questions
      unsubscribeQuestions = db
        .collection('questions')
        .doc('current')
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const currentQuestions = snapshot.data()?.questions || [];
            setQuestions(currentQuestions);
          }
        });

      // Set up realtime listener for responses
      unsubscribeResponses = db
        .collection('responses59')
        .onSnapshot((snapshot) => {
          const allResponses: userData[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as userData;

            // Normalize names for comparison
            const normalizedDataName = data.name.toLowerCase().trim();
            const normalizedName = name.toLowerCase().trim();

            if (normalizedDataName === normalizedName) {
              setAnswers(data.responses);
            }
            allResponses.push(data);
          });
          setResponses(allResponses);
        });
    };

    setupListeners();

    // Cleanup function
    return () => {
      if (unsubscribeQuestions) unsubscribeQuestions();
      if (unsubscribeResponses) unsubscribeResponses();
    };
  }, [name]); // Only depend on name

  // New useEffect to calculate scores when either questions or responses update
  useEffect(() => {
    if (questions.length > 0 && responses.length > 0) {
      calculateAndUpdateScores(questions, responses);
    }
  }, [questions, responses]);

  const calculateAndUpdateScores = (
    currentQuestions: Question[],
    responsesList: userData[],
  ) => {
    const updatedResults = responsesList.map((data) => ({
      ...data,
      score: data.responses.reduce((acc, { value }, i) => {
        const question = currentQuestions[i];
        if (question && question.final && value === question.final) {
          return acc + 1;
        }
        return acc;
      }, 0),
    }));

    setResults(updatedResults);
  };

  let prev = -1;

  return (
    <div>
      <details>
        <summary>Your answers</summary>
        <div>
          <ol>
            {questions.map((question, i) => {
              let correct;
              if (!question.final || question.final === '') {
                correct = 'var(--text-color)';
              } else {
                correct =
                  question.final === answers[i]?.value ? 'green' : 'red';
              }
              return (
                <li key={i} style={{ marginBottom: 15, color: correct }}>
                  <div>{question.text}</div>
                  <div
                    style={{
                      display: 'grid',
                      gridAutoFlow: 'column',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: 'auto 1fr',
                      columnGap: 10,
                    }}
                  >
                    {question.answers.map((a, j) => (
                      <div key={j}>
                        <span
                          style={{
                            fontWeight:
                              answers[i]?.value === a.letter
                                ? 'bold'
                                : 'normal',
                            color: question.final
                              ? question.final === a.letter
                                ? 'green'
                                : answers[i]?.value === a.letter
                                ? 'red'
                                : 'var(--text-color)'
                              : 'var(--text-color)',
                          }}
                        >
                          {question.final
                            ? answers[i]?.value === a.letter
                              ? question.final === a.letter
                                ? '✅'
                                : '❌'
                              : undefined
                            : undefined}{' '}
                          {a.letter}. {a.value}
                        </span>
                      </div>
                    ))}
                    {question.answers.length === 0 && (
                      <div>{answers[i]?.value}</div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </details>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>TB Guess</th>
          </tr>
        </thead>
        <tbody>
          {results
            .sort(
              ({ score: ascore = 0 }, { score: bscore = 0 }) => bscore - ascore,
            )
            .map(({ name: lName, score = 0, responses }, i) => {
              const rank = prev === -1 || prev !== score ? `${i + 1}.` : '';
              prev = score;
              const isCurrentUser =
                lName.toLowerCase().trim() === name.toLowerCase().trim();
              return (
                <tr
                  key={lName}
                  style={{ fontWeight: isCurrentUser ? 'bold' : 'normal' }}
                >
                  <td>{rank}</td>
                  <td>{lName}</td>
                  <td>{score}</td>
                  <td>{responses[19]?.value}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
