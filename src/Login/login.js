import React from 'react';
import firebase from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


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
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    /*render() {
        return (
            <div className='container'>
                <section className='create-account'>
                    <form onSubmit={this.handleSubmit}>   
                        <input type="text" name="name" value={this.state.value} onChange={this.handleChange} value={this.state.name} /> 
                        <input type="text" name="email" value={this.state.value} onChange={this.handleChange} value={this.state.email} />
                        <input type="password" name="password" value={this.state.value} onChange={this.handleChange} value={this.state.password} />
                        <input type="submit" value="Login" />
                    </form>
                </section>
            </div>
        );
    }*/

}

const style = {
    margin: 15,
};
export default Login;