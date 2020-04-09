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
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    moveDataToParent(user){
        this.props.sendUser(user.user.uid);
    }
    handleLogin(event) {
        let oldState = this;
        try {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                alert("Successfully logged in!");
                console.log("Logged in ", user.user.uid);
                oldState.setState({ uid: user.user.uid });
                //oldState.props.sendUser(user);
                window.location.replace("/");


                //this.this.moveDataToParent(user)
            });
            //console.log(this.state.uid);
        } catch(error){
            console.log(error.toString());
            return;
        }
        event.preventDefault();
    }
  
    isLoggedIn(event) {
        //let map = firebase.firestore().collection('users').doc(CurrentUserID);
        //console.log(map)

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              //this.setState({ user });
              console.log(user);
              //this.props.sendUser(user);
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
    render() {
        return (
            <Container component="main" maxWidth="xs" color="white">
                <CssBaseline />
                <div className="container">
                    <section className='log-in'></section>

                    <Typography component="h1" variant="h5">
                    Log in
                    </Typography>
                    <form noValidate>
                    <Grid container spacing={2}>
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

                        <Grid item xs={12}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(event) => {this.handleLogin(event)}}
                            >
                                Log in
                            </Button>
                        </Grid>
                        
                    </Grid>
                    </form>
            </div>
            </Container>
        );
    }
}

export default Login;