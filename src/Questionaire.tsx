import React, { useEffect, useState } from 'react';
import Question from './Question';
import { db } from './data/firebaseConfig';
import { Question as QuestionData } from './data/questions';

export interface UserResponse {
  value: string;
}

const Questionaire = () => {
  const [state, setState] = useState<UserResponse[]>([]);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>();
  const [showThanks, setShowThanks] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  useEffect(() => {
    if (window.location.search.indexOf('name') >= 0) {
      const url = new URL(window.location.toString());
      const params = new URLSearchParams(url.search);
      const n = params.get('name');
      if (n) {
        setName(n);
      }
    } else {
      const savedName =
        localStorage.getItem('name59') ?? localStorage.getItem('name58');
      if (savedName) {
        setName(savedName);
      }
    }
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      const snapshot = await db.collection('questions').doc('current').get();
      if (snapshot.exists) {
        setQuestions(snapshot.data()?.questions || []);
      }
    };

    loadQuestions();
  }, []);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(
      state,
      state.filter((x) => x).length,
      questions.filter((q) => q.answers.length > 0).length,
    );
    if (!name) {
      setError('Please enter your name');
    } else if (
      state.filter((x) => x).length !==
      questions.filter((q) => {
        if (!q.final) return true;
        if (Array.isArray(q.final)) return q.final.length === 0;
        return q.final === '';
      }).length
    ) {
      setError('Please answer all the questions');
    } else {
      setError('');
      const ref = await db.collection('responses60').doc(name.toLowerCase());
      const doc = ref.get();
      const responses = state.map((x) => (x ? x : { value: '' }));
      if ((await doc).exists) {
        setError('Name is taken. Please pick a new name');
        return;
      } else {
        ref
          .set({
            name,
            responses,
          })
          .catch(() => {
            setError('Error Saving');
            throw new Error();
          });
        localStorage.setItem('name60', name);
        setShowThanks(true);
      }
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return showThanks ? (
    <div>
      Thanks for submitting your responses! Check back later to see how you did!
    </div>
  ) : (
    <form>
      <label htmlFor="name">Enter your name:</label>
      <input type="text" name="name" value={name} onChange={handleNameChange} />
      <ol>
        {questions.map((q, i) => (
          <Question key={i} question={q} setState={setState} state={state} />
        ))}
      </ol>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <div style={{ color: 'red' }}>{error}</div>
    </form>
  );
};

export default Questionaire;
