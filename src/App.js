import React from 'react';
import User from './username.js'
import RegisterForm from './Login/register.js';
import ViewMap from './ViewMap/viewmap.js';
import Login from './Login/login.js';
import BuildMapView from './MapBuild/buildmap.js';
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
        this.state = {value: 'login', toggle:true};
      }
      

      render() {
        const li = [
            {
                link: "/mainPage",
                text: "Main Page"
            },

            {
                link: "/build",
                text: "Build Map"
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

          return (
            <div className="App">
              <Router>
              <header className="App-header">
                                <div className="navBar">
                    <button onClick={this.Toggle}>

                    </button>
                    <ul className={this.state.toggle ? "links show-nav" : "links"}>
                        {
                            li.map((objLink, i) => {
                                return ( <li key={i}><a href={objLink.link}>{objLink.text}</a></li> )
                            })
                        }
                    </ul>
                </div>  
                <div>
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
                      <Login></Login>
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