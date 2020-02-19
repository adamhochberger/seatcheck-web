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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
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
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)} />
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