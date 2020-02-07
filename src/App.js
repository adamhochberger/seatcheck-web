import React from 'react';
<<<<<<< HEAD
import User from './username.js';
import NameForm from './Login/register.js';
import MainPage from './mainPage.js';
import Login from './Login/login.js';
=======
import User from './username.js'
import RegisterForm from './Login/register.js';
import BuildMapView from './MapBuild/buildmap.js';
import MainPage from './mainPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
>>>>>>> master

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
<<<<<<< HEAD
                  <Login></Login>  
                  <MainPage></MainPage>
=======
                  <Switch>
                    <Route exact path= "/">
                    {console.log("Home")} 
>>>>>>> master

                      <MainPage></MainPage>
                    </Route>
                    <Route path= "/register">
                      {console.log("RegisterPage")} 
                      <RegisterForm></RegisterForm>
                    </Route>
                    <Route path= "/build">
                      <BuildMapView></BuildMapView>
                    </Route>
                  </Switch>
                </div>
<<<<<<< HEAD
                <p>More information</p>
                  <a
                  className="App-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick ={this.handleClick}
                >
                  Create an Account
                </a>
              
  {/*              <User></User>
                <NameForm></NameForm> */}
=======

                  <Link to='/mainPage'>Main Page</Link>
                  <Link to='/register'>Register Here</Link>
                  <Link to='/build'> Build Map</Link>
>>>>>>> master
              </header>
              </Router>
            </div>
          );
    }
}

export default App;