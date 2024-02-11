import React, { useEffect } from 'react';
import Leaderboard from './Leaderboard';
import Questionaire from './Questionaire';
import { comingSoon } from './data/config';
import ComingSoon from './ComingSoon';

function App() {
  let name = localStorage.getItem('name58');
  useEffect(() => {
    if (window.location.search.indexOf('clear') >= 0) {
      localStorage.removeItem('name58');
      name = null;
      window.location.href = window.location.origin;
    }
  }, [name]);

  return comingSoon ? (
    <ComingSoon />
  ) : (
    <div className="App">
      <header className="App-header">
        <h1>Superbowl LVIII Prop Bets</h1>
      </header>
      {name ? <Leaderboard name={name} /> : <Questionaire />}
    </div>
  );
}

export default App;
