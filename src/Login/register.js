import React from 'react';
import firebase from '../firebase.js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastName: '',
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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
        event.preventDefault();
    }

    render() {      
    return (
        <Container component="main" maxWidth="xs" color="white">
          <CssBaseline />
          <div className="container">
          <section className='create-account'></section>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    color="primary"
                    type="text" 
                    onChange={this.handleChange} 
                    value={this.state.firstName} 
                    />        
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    color="primary"
                    type="text" 
                    onChange={this.handleChange} 
                    value={this.state.lastName} 
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
                    autoComplete="email"
                    color="primary"
                    type="text" 
                    onChange={this.handleChange} 
                    value={this.state.email} 
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
                    autoComplete="current-password"
                    color="primary"
                    type="text" 
                    onChange={this.handleChange} 
                    value={this.state.password} 
                    />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onSubmit={this.handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    );
    /*
    <div className='container'>
    <section className='create-account'>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange} value={this.state.name} />        
        </label>
        <label>
          Email:
          <input type="text" name="email" value={this.state.value} onChange={this.handleChange} value={this.state.email} />        
        </label>
        <label>
          Password:
          <input type="password" name="password" value={this.state.value} onChange={this.handleChange} value={this.state.password}/>
        </label>
        <label>
          Confirm password:
          <input type="password" name="confirmPass" value={this.state.value} onChange={this.handleChange} value={this.state.confirmPass} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </section>
</div>   
*/   
    }
}

export default RegisterForm;
