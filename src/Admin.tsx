import React, { useEffect, useState } from 'react';
import { db } from './data/firebaseConfig';
import { Question } from './data/questions';

const Admin = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAuthenticated(isAdmin);

    if (isAdmin) {
      loadQuestions();
    }
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

  const handleAnswerUpdate = async (questionId: number, answer: string) => {
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

  return isAuthenticated ? (
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
              <td style={styles.td}>{q.final || 'Not set'}</td>
              <td style={styles.td}>
                <select
                  value={q.final || ''}
                  onChange={(e) => handleAnswerUpdate(q.id, e.target.value)}
                >
                  <option value="">Select answer</option>
                  {q.answers.map((a) => (
                    <option key={a.letter} value={a.letter}>
                      {a.letter} - {a.value}
                    </option>
                  ))}
                </select>
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
