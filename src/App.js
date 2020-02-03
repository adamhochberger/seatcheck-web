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
            console.log("runs")
            return (
              <div className="App">
               <header className="App-header">
                 <User></User>
                 <NameForm></NameForm>
               </header>
             </div>
           );
         }
         else{
          return (
            <div className="App">
              <header className="App-header">
                <MainPage></MainPage>
  {/*              <User></User>
                <NameForm></NameForm> */}
              </header>
            </div>
          );
        }
    }
}

export default MainPage;