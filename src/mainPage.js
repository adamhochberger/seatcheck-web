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
                <Switch>
                    <Route path= "/mainPage">
                      <MainPage></MainPage>
                    </Route>
                    <Route path= "/register">
                      <NameForm></NameForm>
                    </Route>
                </Switch>
            <div className="App">
            <header className="App-header">
              <img src={logo2} alt="logo" />
              <p>
                Welcome to Social Compass.
              </p>
              
              <Link to='/mainPage'>Main Page</Link>
              <Link to='/register'>Register Here</Link>
              <Link to='/register'>Create a floor plan</Link>
              <Link to='/register'>View a floor plan</Link>
              </header>
            </div>
          </Router>
        );
      }

}

export default MainPage;