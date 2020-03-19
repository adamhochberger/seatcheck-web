import React from 'react';
import firebase from '../firebase.js';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPass: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
          this.setState({ [event.target.name]: event.target.value });
      }
    
    
      handleSubmit(event) {
          const enteredEmail = this.state.email;
          try {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                console.log("user.uid: ", user.user.uid);
                firebase.firestore().collection('users').doc(user.user.uid).set({
                    uid: user.user.uid,
                    email: enteredEmail,
                    joinedMaps: [],
                    createdMaps: []
                }).then(function(){
                  console.log("Document successfully written!")
                }).catch(function(error){
                  console.error('Error adding document: ', error)
                });
            });
        } catch (error) {
            console.log(error.toString());
        }
        event.preventDefault();
        
      }

      render() {
        return (           
            <Container component="main" maxWidth="xs" color="white">
                <CssBaseline />
                <div className="container">
                    <section className='log-in'></section>

                    <Typography component="h1" variant="h5">
                    Register
                    </Typography>
                    <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
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
                            id="email"
                            label="Email Address"
                            name="email"
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            color="primary"
                            onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm-password"
                                label="Confirm password"
                                type="password"
                                id="confirm-password"
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
                            onClick={this.handleSubmit}
                        >
                        Sign Up
                        </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </Container>
        ); 
    }

}

export default RegisterForm;;