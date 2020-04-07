import React from 'react';
import firebase from './firebase.js';
import User from './username.js'
import RegisterForm from './Login/register.js';
import ViewMap from './ViewMap/viewmap.js';
import Login from './Login/login.js';
import BuildMapView from './MapBuild/createmap.js';
import MainPage from './mainPage.js';
import Button from '@material-ui/core/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'login', toggle:true, currentUser:undefined};
        this.handleClick = this.handleClick.bind(this);
        this.loginSwitch = this.loginSwitch.bind(this);
        this.viewMapSwitch = this.viewMapSwitch.bind(this);
        this.buildMapSwitch = this.buildMapSwitch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCurrentUser = this.getCurrentUser .bind(this);        

      }
      getCurrentUser(user){
        console.log("Hello from App")
        this.setState({currentUser:user});
        console.log(this.state.currentUser);
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
        const li = [
            {
                link: "/mainPage",
                text: "Main Page"
            },

            {
                link: "/build",
                text: "Create Map"
            },
            {
                link: "/view",
                text: "View Map"
            },
            {
                link: "/register",
                text: "Register"
            },
            {
                link: "/login",
                text: "Login"
            }
        ];
        
        var oldState = this;
        return (
            <div className="App">
                <Router>
                    <header className="App-header">
                        <div className="navBar">
                            <button onClick={this.Toggle} />
                            <ul className={this.state.toggle ? "links show-nav" : "links"}>
                                {
                                    li.map((objLink, i) => {
                                        return ( <li key={i}><a href={objLink.link}>{objLink.text}</a></li> )
                                    })
                                }
                            </ul>
                        </div>  
                        <div>
                          {this.state.currentUser != undefined &&
                              <p>
                                Hello {this.state.currentUser.user.email}
                                </p>
                          }
                            <Switch>
                            <Route exact path= "/mainPage">
                                <MainPage></MainPage>
                            </Route>
                            <Route path= "/register">
                                <RegisterForm></RegisterForm>
                            </Route>
                            <Route path= "/build">
                                <BuildMapView></BuildMapView>
                            </Route>
                            <Route path= "/view">
                                <ViewMap></ViewMap>
                            </Route>
                            <Route path= "/login">
                                <Login sendUser={this.getCurrentUser}></Login>
                            </Route>
                            </Switch>
                        </div>
                    </header>
              </Router>
            </div>
          );
    }
}

export default App;