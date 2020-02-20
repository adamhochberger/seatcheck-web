import React from 'react';
import firebase from '../firebase.js';


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
        this.handleLogout = this.handleLogout.bind(this)
        this.isLoggedIn = this.isLoggedIn.bind(this)
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

    handleLogout(event) {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
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

    /*render() {
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
    }*/
    
    render() {
        return (
            <div className='container'>
                <section className='create-account'>
                    <form onSubmit={this.handleLogin}>   
                        <input type="text" name="name" value={this.state.value} onChange={this.handleChange} value={this.state.name} /> 
                        <input type="text" name="email" value={this.state.value} onChange={this.handleChange} value={this.state.email} />
                        <input type="password" name="password" value={this.state.value} onChange={this.handleChange} value={this.state.password} />
                        <input type="submit" value="Login" />
                        <button onClick={this.handleLogout}>Log Out</button>
                    </form>
                    <button onClick={this.isLoggedIn}>Test</button>
                </section>
            </div>
        );
    }
}

/*const style = {
    margin: 15,
};*/
export default Login;