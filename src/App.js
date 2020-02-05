import React from 'react';
import User from './username.js'
import NameForm from './Login/register.js'
import MainPage from './mainPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'login', toggle:true};
        this.handleClick = this.handleClick.bind(this);
        this.loginSwitch = this.loginSwitch.bind(this);
        this.viewMapSwitch = this.viewMapSwitch.bind(this);
        this.buildMapSwitch = this.buildMapSwitch.bind(this);
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
            value: 'value'
          }));
      }
      loginSwitch(){
        this.setState(state => ({
          value: 'loginPage'
        }));
      }
      viewMapSwitch(){
        this.setState(state => ({
          value: 'viewMapPage'
        }));
      }
      buildMapSwitch(){
        this.setState(state => ({
          value: 'buildMapPage'
        }));
      }
      render() {
          const selection = this.state.value
          console.log(selection);
          if (selection == 'loginPage'){
            return (
              <div className="App">
               <header className="App-header">
                 <NameForm></NameForm>
               </header>
             </div>
           );
         }
         if (selection == 'buildMapPage'){
          return (
            <div className="App">
             <header className="App-header">
               <NameForm></NameForm>
             </header>
           </div>
         );
       }
         else{
          return (
            <Router>
            <div className="App">
              <header className="App-header">
                <div>
                  <Switch>
                    <Route path= "/mainPage">
                      <MainPage></MainPage>
                    </Route>
                    <Route path= "/register">
                      <NameForm></NameForm>
                    </Route>
                  </Switch>

                </div>

                  <Link to='/mainPage'>Main Page</Link>
                  <Link to='/register'>Register Here</Link>

              
  {/*              <User></User>
                <NameForm></NameForm> */}
              </header>
            </div>
          </Router>
          );
        }
    }
}

export default App;