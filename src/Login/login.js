import React from 'react';
import firebase from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {white500} from 'material-ui/styles/colors';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            loggedIn: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLogin(event) {
        try {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                
                console.log("Logged in ", user);
                
            });
            
        } catch(error){
            console.log(error.toString());
            return;
        }
        event.preventDefault();

    }
  
    isLoggedIn(event) {
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              //this.setState({ user });
              console.log(user);
              //this.setState({loggedIn:true});
              this.setState(state => ({
                loggedIn: true
              }));
              console.log(this.state.loggedIn);
              
            } /*else if (!user && this.state.loggedIn) {
                this.setState({loggedIn:false});
            }*/
            
        });
    }
  
    handleLogout(event) {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
        event.preventDefault();
    }

    render() {
        const styles = {
            errorStyle: {
                color: white500,
            },
            underlineStyle: {
                borderColor: white500,
            },
            floatingLabelStyle: {
                color: white500,
            },
            floatingLabelFocusStyle: {
                color: white500,
            },
            margin: 15,
        };
        return (
            <div>
                <br />
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            hintStyle={styles.errorStyle}
                            inputStyle={styles.errorStyle}  
                            />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            hintStyle={styles.errorStyle}
                            inputStyle={styles.errorStyle}
                            />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleLogin(event)} />
                        <RaisedButton label="Test" primary={true} style={style} onClick={(event) => this.isLoggedIn(event)} />
                        <RaisedButton label="Logout" primary={true} style={style} onClick={(event) => this.handleLogout(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Login;