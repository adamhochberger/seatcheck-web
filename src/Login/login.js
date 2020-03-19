import React from 'react';
import firebase from '../firebase.js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


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
        console.log(this.state.email);
        console.log(this.state.password);

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
        return (
            <Container component="main" maxWidth="xs" color="white">
                <CssBaseline />
                <div className="container">
                    <section className='log-in'></section>

                    <Typography component="h1" variant="h5">
                    Log in
                    </Typography>
                    <Grid container spacing={2}>
                    <form noValidate>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            color="primary"
                            type="text"
                            onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            color="primary"
                            onChange={this.handleChange}
                            />
                        </Grid>
                    </form>

                        <Grid item xs={12}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(event) => this.handleLogin(event)}
                            >
                                Log in
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(event) => this.handleLogout(event)}
                            >
                                Log out
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(event) => this.isLoggedIn(event)}
                            >
                            Test
                            </Button>
                        </Grid>
                    </Grid>
            </div>
            </Container>
        );
    }
}

export default Login;