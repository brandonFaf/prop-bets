import React, { useEffect } from 'react';
import Leaderboard from './Leaderboard';
import Questionaire from './Questionaire';

function App() {
  let name = localStorage.getItem('name');
  useEffect(() => {
    if (window.location.search.indexOf('clear') >= 0) {
      localStorage.removeItem('name');
      name = null;
      window.location.href = window.location.origin;
    }
  }, [name]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Superbowl LV Prop Bets</h1>
      </header>
      {name ? <Leaderboard name={name} /> : <Questionaire />}
    </div>
  );
}

export default App;
