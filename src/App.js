import React from 'react';
import firebase from './firebase.js';
import User from './username.js'
import RegisterForm from './Login/register.js';
import MenuAppBar from './materials/menubar.js';
import ViewMap from './ViewMap/viewmap.js';
import Login from './Login/login.js';
import BuildMapView from './MapBuild/createmap.js';
import MainPage from './mainPage.js';
import Button from '@material-ui/core/Button';
import {AppBar,
    Toolbar,
    Typography,
    IconButton,
    Switch as Switchy,
    FormControlLabel,
    FormGroup,
    Menu,
    MenuItem} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {AccountCircle} from '@material-ui/icons';
import {MenuIcon} from '@material-ui/icons/Menu';
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
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const useStyles = makeStyles(theme => ({
            menuButton: {
                marginRight: theme.spacing(2),
            }
        }))
          return (
            <div className="App">
                <MenuAppBar></MenuAppBar>
                  
                </div>
              
          );
    }
}

export default App;