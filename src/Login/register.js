import React from 'react';
import firebase from '../firebase.js';


class NameForm extends React.Component {
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
        if (this.state.confirmPass == this.state.password) {
            try {
              firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                  //console.log("user.uid: ", user.user.uid);
                  firebase.firestore().collection('users').doc(user.user.uid).set({
                      uid: user.user.uid,
                      email: this.state.email,
                      joinedMaps: [],
                      createdMaps: []
                  });
              });

          } catch (error) {
              console.log(error.toString());
          }
        }
      }

      render() {
          return (
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
        );
      }

}

export default NameForm;