import React, { useEffect, useState } from 'react';
import { db } from './data/firebaseConfig';
import questions from './data/questions';
import { UserResponse } from './Questionaire';
interface userData {
  name: string;
  responses: UserResponse[];
  score?: number;
}
const Leaderboard = ({ name }: { name: string }) => {
  const [answers, setAnswers] = useState<UserResponse[]>([]);
  const [results, setResults] = useState<userData[]>([]);
  useEffect(() => {
    const getData = async () => {
      const docRef = await db.collection('responses').get();

      const allResults = docRef.docs.map((d) => {
        const data = d.data() as userData;
        const score = data.responses.reduce(
          (acc, { value }, i) => (value == questions[i].final ? acc + 1 : acc),
          0,
        );
        if (data.name == name) {
          setAnswers(data.responses);
        }
        return { ...data, score };
      });
      setResults(allResults);
    };
    getData();
  }, [name]);
  let prev = -1;
  return (
    <div>
      <details>
        <summary>Your answers</summary>
        <div>
          <ol>
            {questions.map((question, i) => {
              let correct;
              if (!question.final) {
                correct = 'white';
              } else {
                correct = question.final == answers[i]?.value ? 'green' : 'red';
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
                              answers[i]?.value == a.letter ? 'bold' : 'normal',
                            textDecoration:
                              answers[i]?.value == a.letter
                                ? 'underline'
                                : 'none',
                            color: question.final
                              ? question.final == a.letter
                                ? 'green'
                                : answers[i]?.value == a.letter
                                ? 'white'
                                : 'white'
                              : 'white',
                          }}
                        >
                          {a.letter}. {a.value}
                        </span>
                      </div>
                    ))}
                    {question.answers.length == 0 && (
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
              const rank = prev == -1 || prev != score ? `${i + 1}.` : '';
              prev = score;
              return (
                <tr
                  style={{
                    backgroundColor: score == 8 &&  responses[13]?.value == 42 ? 'yellow' : '',
                  }}
                  key={lName}
                >
                  <td>{score == 8 &&  responses[13]?.value == 42 ? ⭐️:rank}</td>
                  <td>{lName}</td>
                  <td>{score}</td>
                  <td>{responses[13]?.value}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
