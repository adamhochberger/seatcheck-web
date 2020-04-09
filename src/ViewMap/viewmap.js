import React from 'react';
import MyFilteringComponent from '../filter.js';
import { Grid } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import firebase from '../firebase.js';


/* TODO
  There should be a prepage, asking the user to enter the secret code for map
  Change filter so a person searched pops up as a person emoji or something
*/

//Object for the logged in user
class CurrentUser {
  constructor() {
    //Get user info and Fill into the state
      this.name = null;
      this.friends = ['John','Blake'];
  }
}
class Container {
  constructor() {
    this.array = [];
  }
}
class Square {
  constructor() {
    this.type = 'O';
    this.suit = null;
    this.users = ['Barry Allen', "Clark Kent", "John"];
  }
}

class ViewMap extends React.Component {
    constructor(props) {
        super(props);
        //Needs to store users and 
        this.state = {grid: new Container(), curr:'O', currentUser: new CurrentUser(), peopleSeated: ['John',"Mark"], code:""};
        this.displayFriendsOnSelect = this.displayFriendsOnSelect.bind(this);     
        this.getMapFromCode = this.getMapFromCode.bind(this);        
        this.getGridData = this.getGridData.bind(this);        

        

        const initializeGrid = () => {
          this.state.grid = new Container();
  
          for (let i = 0; i < 10; i++) {
            let container = new Container();
            this.state.grid.array.push(container);
            for (let j = 0; j < 10; j++){
              var square = new Square();
              this.state.grid.array[i].array.push(square);
            }
          }
        };
          
        initializeGrid();

      }

      //Code here to send current grid layout to firebase under user credentials
      getMapFromCode(event) {
        if(this.state.code == ""){
          alert("Please enter a code");
          return;
        }
        let map = firebase.firestore().collection('data').doc(this.state.code);

        let getDoc = map.get()
        .then(doc => {
          if (!doc.exists) {
            alert("Error: Doesn't Exist");
            console.log('No such document!');
          } 
          else {
            console.log('Document data:', doc.data());
            this.setState({
              grid: doc.data()
            });
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });

      }

      updateCode = (event) => {
        var newCode = event.target.value;
        this.setState({code: newCode});
      }
      //updates point based on the location the user clicks on the grid
      displayFriendsOnSelect(event) {
        var col = event.target.getAttribute("id");
        var row = event.target.getAttribute("class");

        this.setState({
            grid: this.state.grid, 
            curr: this.state.curr, 
            currentUser: new CurrentUser(), 
            peopleSeated: this.state.grid.array[row].array[col].users
          });

        this.state.peopleSeated = this.state.grid.array[row].array[col].users;
        this.setState(this.state.peopleSeated);
      }
      //Sends data from parent to child
      //Iterates through graph, finding friends who are sitting there
      getGridData(i,j,val){
        this.state.grid[parseInt(i)][parseInt(j)].type = val;
        this.setState(this.state.grid);

      }
      render() {  
        return (

          <div>
                <h1>View Map</h1>
                <label>
                  Enter Code to View Map:
                </label>
                <Input placeholder="Enter map password to join one" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />
                <Button variant="contained" color="secondary" onClick={this.getMapFromCode}>
                        Submit
                </Button>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center">
                    <Grid item>
                        <table>
                          {
                            this.state.grid.array.map((row, index) => (
                              <tr key={index} id="row">
                                {row.array.map( (cellContent,colIndex) => 
                                  <td key={colIndex} onClick={this.displayFriendsOnSelect} id={colIndex} className={index} img={cellContent.type} ></td>)}
                              </tr>
                            ))
                          }
                        </table>
                    </Grid>
                    <Grid item>
                        <h4>People Sitting Here:</h4>
                        <table>
                            {
                            this.state.peopleSeated.map((person, index) => (
                                <tbody key={index} id="row">
                                {person}
                                </tbody>
                            ))
                            }
                        </table>
                  </Grid>
                </Grid>

                    <br>
                    </br>


            <h2>Your Friends:</h2>
            <MyFilteringComponent sendGridData={this.getGridData}  grid={this.state.grid} content={this.state.currentUser.friends} hasFriends={false}/>

          </div>   
          );
        }
        
      }
      
export default ViewMap;