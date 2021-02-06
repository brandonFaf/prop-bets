import React, { useEffect } from 'react';
import Questionaire from './Questionaire';

function App() {
  let filledOutAlready = localStorage.getItem('name');
  useEffect(() => {
    if (window.location.search.indexOf('clear') >= 0) {
      localStorage.removeItem('name');
      filledOutAlready = null;
    }
  }, [filledOutAlready]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Superbowl LV Prop Bets</h1>
      </header>
      {filledOutAlready ? (
        <div>You filled this out already</div>
      ) : (
        <Questionaire />
      )}
    </div>
  );
}

export default App;
