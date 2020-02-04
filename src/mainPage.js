import React from 'react';
import logo from './logo.svg';
import logo2 from './logo.png';
import './index.css';

class MainPage extends React.Component {
      render() {
      
        return (
            <div className="App">
            <header className="App-header">
              <img src={logo2} alt="logo" />
              <p>
                Welcome to Social Compass.
              </p>
              

              <a
                className="App-link"
                href="login.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create a floor plan
              </a>
      
              <a
                className="App-link"
                href="login.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Your Floor Plans
              </a>
      
{/*              <User></User>
              <NameForm></NameForm> */}
            </header>
          </div>
        );
      }

}

export default MainPage;