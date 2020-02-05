import React from 'react';
import User from './username.js'
import NameForm from './Login/register.js'
import MainPage from './mainPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'login', toggle:true};
        this.handleClick = this.handleClick.bind(this);
        this.loginSwitch = this.loginSwitch.bind(this);
        this.viewMapSwitch = this.viewMapSwitch.bind(this);
        this.buildMapSwitch = this.buildMapSwitch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
      handleClick(){
          this.setState(state => ({
            value: 'value'
          }));
      }
      loginSwitch(){
        this.setState(state => ({
          value: 'loginPage'
        }));
      }
      viewMapSwitch(){
        this.setState(state => ({
          value: 'viewMapPage'
        }));
      }
      buildMapSwitch(){
        this.setState(state => ({
          value: 'buildMapPage'
        }));
      }
      render() {
          return (
            <div className="App">
              <Router>
              <header className="App-header">
                <div>
                  <Switch>
                  <Route path= "/">
                      <MainPage></MainPage>
                    </Route>
                  </Switch>
                </div>

                  <Link to='/mainPage'>Main Page</Link>
                  <Link to='/register'>Register Here</Link>
              </header>
              </Router>
            </div>
          );
    }
}

export default App;