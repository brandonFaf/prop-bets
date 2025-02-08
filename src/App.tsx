import React, { useEffect, useState } from 'react';
import Leaderboard from './Leaderboard';
import Questionaire from './Questionaire';
import { comingSoon } from './data/config';
import ComingSoon from './ComingSoon';
import Admin from './Admin';
import { initializeQuestions } from './scripts/initializeQuestions';

function App() {
  let name = localStorage.getItem('name59');
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (window.location.search.indexOf('clear') >= 0) {
      localStorage.removeItem('name59');
      name = null;
      window.location.href = window.location.origin;
    }
    if (window.location.search.indexOf('admin') >= 0) {
      setIsAdmin(true);
    }
  }, [name]);
  return isAdmin ? (
    <Admin />
  ) : comingSoon ? (
    <ComingSoon />
  ) : (
    <div className="App">
      <header className="App-header">
        <h1>Superbowl LIX Prop Bets</h1>
      </header>
      {name ? <Leaderboard name={name} /> : <Questionaire />}
    </div>
  );
}

export default App;
