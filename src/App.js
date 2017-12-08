import React, { Component } from 'react';
import './App.css';
import RacingList from './RacingList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Ladbrokes betting app</h1>
        </header>
        <h2 className="mt-4">Upcoming Races</h2>
        <RacingList />
      </div>
    );
  }
}

export default App;
