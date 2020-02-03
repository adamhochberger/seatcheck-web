import React from 'react';
import logo from './logo.svg';
import logo2 from './logo.png';
import User from './username.js'
import NameForm from './NameForm.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo2} alt="logo" />
        <p>
          Welcome to Seat Check__.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info
        </a>
        <User></User>
        <NameForm></NameForm>
      </header>
    </div>
  );
}

export default App;
