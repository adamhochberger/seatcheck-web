import React from 'react';
import logo2 from './assets/./logo.png';
import './index.css';
import MyFilteringComponent from './filter.js';
import Login from './Login/login.js'

import {
  BrowserRouter as Router,
} from "react-router-dom";
class MainPage extends React.Component {
      render() {
        const users =
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