import React from 'react';
import logo from './logo.svg';
import logo2 from './logo.png';
import User from './username.js'
import NameForm from './NameForm.js'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', toggle:true};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
      handleClick(){
          this.setState(state => ({
            toggle: !state.toggle
          }));
      }
      render() {
          const t = this.state.toggle
          if (t == false){
          }
        return (
            <div className="App">
            <header className="App-header">
              <img src={logo2} alt="logo" />
              <p>
                Welcome to Social Compass.
              </p>
              
              <a
                className="App-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={this.handleClick}
              >
                Login Page
              </a>
              
              <a
                className="App-link"
                href="login.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create a floor plan
              </a>
      
              <a
                className="App-link"
                href="login.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Your Floor Plans
              </a>
      
{/*              <User></User>
              <NameForm></NameForm> */}
            </header>
          </div>
        );
      }

}

export default MainPage;