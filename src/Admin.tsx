import React, { useEffect, useMemo, useState } from 'react';
import firebase from 'firebase';
import { db } from './data/firebaseConfig';
import { Question } from './data/questions';
import { bingoOptions } from './data/bingoOptions';

const GAME_DOC_ID = 'current';
const GAME_COLLECTION = 'bingoGame60';

type BingoGameDoc = {
  turn: number;
  occurred: string[];
  eventLog?: {
    option: string;
    turn: number;
    at: string;
    by: string;
  }[];
};

const Admin = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bingoGame, setBingoGame] = useState<BingoGameDoc>({
    turn: 0,
    occurred: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [bingoError, setBingoError] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAuthenticated(isAdmin);

    if (isAdmin) {
      loadQuestions();
    }
  }, []);

  useEffect(() => {
    const gameRef = db.collection(GAME_COLLECTION).doc(GAME_DOC_ID);
    const unsubscribe = gameRef.onSnapshot((snap) => {
      if (!snap.exists) {
        gameRef.set({ turn: 0, occurred: [], eventLog: [] });
        return;
      }
      setBingoGame(snap.data() as BingoGameDoc);
    });
    return () => unsubscribe();
  }, []);

  const loadQuestions = async () => {
    const snapshot = await db.collection('questions').doc('current').get();
    if (snapshot.exists) {
      setQuestions(snapshot.data()?.questions || []);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
      // Store authentication status
      localStorage.setItem('isAdmin', 'true');
      loadQuestions();
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdmin');
    setQuestions([]);
  };

  const handleAnswerUpdate = async (questionId: number, answer: string[]) => {
    try {
      const updatedQuestions = questions.map((q) =>
        q.id === questionId ? { ...q, final: answer } : q,
      );

      await db.collection('questions').doc('current').set({
        questions: updatedQuestions,
        lastUpdated: new Date(),
      });

      setQuestions(updatedQuestions);
      setSuccess('Answer updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update answer');
    }
  };

  const toggleFinalAnswer = (question: Question, letter: string) => {
    const currentFinal = Array.isArray(question.final)
      ? question.final
      : question.final
      ? [question.final]
      : [];
    const nextFinal = currentFinal.includes(letter)
      ? currentFinal.filter((item) => item !== letter)
      : [...currentFinal, letter];
    handleAnswerUpdate(question.id, nextFinal);
  };

  const occurredSet = useMemo(() => new Set(bingoGame.occurred), [bingoGame]);

  const markEvent = async (option: string) => {
    setIsSaving(true);
    setBingoError('');
    const gameRef = db.collection(GAME_COLLECTION).doc(GAME_DOC_ID);
    try {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(gameRef);
        const data = (snap.exists ? (snap.data() as BingoGameDoc) : null) || {
          turn: 0,
          occurred: [],
          eventLog: [],
        };
        if (data.occurred.includes(option)) {
          const updatedOccurred = data.occurred.filter(
            (entry) => entry !== option,
          );
          const updatedLog = (data.eventLog ?? []).filter(
            (entry) => entry.option !== option,
          );
          const nextTurn = Math.max(0, (data.turn ?? 0) - 1);
          tx.update(gameRef, {
            turn: nextTurn,
            occurred: updatedOccurred,
            eventLog: updatedLog,
          });
          return;
        }
        const nextTurn = (data.turn ?? 0) + 1;
        if (!snap.exists) {
          tx.set(gameRef, {
            turn: nextTurn,
            occurred: [option],
            eventLog: [
              {
                option,
                turn: nextTurn,
                at: new Date().toISOString(),
                by: 'admin',
              },
            ],
          });
          return;
        }
        tx.update(gameRef, {
          turn: nextTurn,
          occurred: firebase.firestore.FieldValue.arrayUnion(option),
          eventLog: firebase.firestore.FieldValue.arrayUnion({
            option,
            turn: nextTurn,
            at: new Date().toISOString(),
            by: 'admin',
          }),
        });
      });
    } catch (err) {
      setBingoError('Could not record event. Try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <section className="bingo-admin">
        <div className="bingo-admin-header">
          <div>
            <h2>Bingo Event Tracker</h2>
            <p>Turn {bingoGame.turn} · {bingoGame.occurred.length} events</p>
          </div>
        </div>
        <div className="bingo-options">
          {[...bingoOptions]
            .sort((a, b) => a.localeCompare(b))
            .map((option) => (
            <button
              key={option}
              type="button"
              className={`bingo-option ${
                occurredSet.has(option) ? 'done' : ''
              }`}
              onClick={() => markEvent(option)}
              disabled={isSaving}
            >
              <span>{option}</span>
              {occurredSet.has(option) ? <strong>Called</strong> : null}
            </button>
          ))}
        </div>
        {bingoError && <div style={{ color: 'red' }}>{bingoError}</div>}
      </section>

      {isAuthenticated ? (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2>Update Question Answers</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
          {success && <div style={{ color: 'green' }}>{success}</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>Question</th>
                <th style={styles.th}>Current Answer</th>
                <th style={styles.th}>Update Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
              <td style={styles.td}>{q.text}</td>
              <td style={styles.td}>
                {Array.isArray(q.final)
                  ? q.final.join(', ')
                  : q.final || 'Not set'}
              </td>
              <td style={styles.td}>
                {q.answers.length ? (
                  <div style={{ display: 'grid', gap: 6 }}>
                    {q.answers.map((a) => {
                      const isChecked = Array.isArray(q.final)
                        ? q.final.includes(a.letter)
                        : q.final === a.letter;
                      return (
                        <label key={a.letter} style={{ display: 'flex' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFinalAnswer(q, a.letter)}
                          />
                          <span style={{ marginLeft: 8 }}>
                            {a.letter} - {a.value}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <span>Free text response</span>
                )}
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
          />
          <button type="submit">Login</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      )}
    </div>
  );
};

const styles = {
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f4f4f4',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default Admin;
