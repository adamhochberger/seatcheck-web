import React from 'react';
import logo from './logo.svg';
import logo2 from './logo.png';
import './index.css';
import MyFilteringComponent from './filter.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class MainPage extends React.Component {
      render() {
        const countries =
        [
            "Tom",
            "Barry",
            "Dave",
            "John"
        ];
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

            <MyFilteringComponent content={countries} />
          </Router>
        );
      }

}

export default MainPage;