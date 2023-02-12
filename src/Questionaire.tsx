import React, { useEffect, useState } from 'react';
import questions from './data/questions';
import Question from './Question';
import { db } from './data/firebaseConfig';
export interface UserResponse {
  value: string;
}
const Questionaire = () => {
  const [state, setState] = useState<UserResponse[]>([]);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>();
  const [showThanks, setShowThanks] = useState<boolean>(false);
  useEffect(() => {
    if (window.location.search.indexOf('name') >= 0) {
      const url = new URL(window.location.toString());
      const params = new URLSearchParams(url.search);
      const n = params.get('name');
      if (n) {
        setName(n);
      }
    }
  }, [window.location]);
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(state);
    if (!name) {
      setError('Please enter your name');
    } else if (
      state.filter((x) => x).length !== questions.filter((x) => !x.final).length
    ) {
      console.log(state.filter((x) => x).length, '!=', questions.filter((x) => !x.final).length)
      setError('Please answer all the questions');
    } else {
      setError('');
      const ref = await db.collection('responses').doc(name.toLowerCase());
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
        localStorage.setItem('name57', name);
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
