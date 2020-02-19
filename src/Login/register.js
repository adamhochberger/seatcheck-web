import React from 'react';
import firebase from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {white500} from 'material-ui/styles/colors';


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPass: ''
        };
    
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    /*
      handleChange(event) {
          this.setState({ [event.target.name]: event.target.value });
      }
    */
    
      handleSubmit(event) {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
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
        const fieldStyle = {

        }
          return (
            <div>
            <br/>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Register"
                    />
                    <TextField
                        type="Name"
                        hintText="Enter your Name"
                        floatingLabelText="Name"
                        onChange={(event, newValue) => this.setState({ name: newValue })}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        hintStyle={styles.errorStyle}
                        inputStyle={styles.errorStyle}                        
                        />
                    <br />
                    <TextField
                        type="Email"
                        hintText="Enter your email"
                        floatingLabelText="Email"
                        onChange={(event, newValue) => this.setState({ email: newValue })}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        hintStyle={styles.errorStyle}
                        inputStyle={styles.errorStyle}                        
                        />
                    <br />
                    <TextField
                        type="Password"
                        hintText="Enter your password"
                        floatingLabelText="Password"
                        onChange={(event, newValue) => this.setState({ password: newValue })}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        hintStyle={styles.errorStyle}
                        inputStyle={styles.errorStyle}                        
                        />
                    <br />
                    <TextField
                        type="Password"
                        hintText="Confirm password"
                        floatingLabelText="Confirm password"
                        onChange={(event, newValue) => this.setState({ confirmPass: newValue })}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        hintStyle={styles.errorStyle}
                        inputStyle={styles.errorStyle}                        
                        />
                    <br />
                    <RaisedButton label="Submit" primary={true} style={styles.margin} onClick={(event) => this.handleSubmit(event)} />
                </div>
            </MuiThemeProvider>
            </div>

        );
      }

}

export default RegisterForm;
