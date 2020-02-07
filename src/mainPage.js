import React from 'react';
import logo from './logo.svg';
import logo2 from './logo.png';
import './index.css';
import NameForm from './Login/register.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class MainPage extends React.Component {
      render() {
      
        return (
          <Router>

            <div className="App">
            <header className="App-header">
              <img src={logo2} alt="logo" />
              <p>
                Welcome to Social Compass.
              </p>
              </header>
            </div>
          </Router>
        );
      }

}

export default MainPage;