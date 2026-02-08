import React, { useEffect, useState } from 'react';
import Leaderboard from './Leaderboard';
import Questionaire from './Questionaire';
import { comingSoon } from './data/config';
import ComingSoon from './ComingSoon';
import Admin from './Admin';
import Bingo from './Bingo';

function App() {
  let name = localStorage.getItem('name60');
  console.log('name:', name);
  const [isAdmin, setIsAdmin] = useState(false);
  const [route, setRoute] = useState(window.location.hash || '#/');
  useEffect(() => {
    if (window.location.search.indexOf('clear') >= 0) {
      localStorage.removeItem('name60');
      name = null;
      window.location.href = window.location.origin;
    }
    if (window.location.search.indexOf('admin') >= 0) {
      setIsAdmin(true);
    }
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [name]);
  const isBingoRoute = route.startsWith('#/bingo');
  return isAdmin ? (
    <Admin />
  ) : comingSoon ? (
    <ComingSoon />
  ) : isBingoRoute ? (
    <Bingo />
  ) : (
    <div className="App">
      <header className="App-header">
        <h1>Superbowl LX Prop Bets</h1>
        {name ? <a href="#/bingo">Open Bingo</a> : null}
      </header>
      {name ? <Leaderboard name={name} /> : <Questionaire />}
    </div>
  );
}

export default App;
