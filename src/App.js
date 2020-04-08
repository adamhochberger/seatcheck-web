import React from 'react';
import MenuAppBar from './materials/menubar.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentUser:undefined};
        this.getCurrentUser = this.getCurrentUser.bind(this);        
      }
      
      getCurrentUser(user){
        console.log("Hello from App")
        this.setState({currentUser:user});
        console.log(this.state.currentUser);
      }
      
      render() {
          return (
            <div className="App">
                <MenuAppBar></MenuAppBar>
                </div>
          );
    }
}

export default App;