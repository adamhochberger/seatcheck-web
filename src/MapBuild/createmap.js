import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import firebase from '../firebase.js';
import Input from '@material-ui/core/Input';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';



/*
TO DO
  Add a remove button
  When map is submitted, give the user who made it a secret code for the map

  Allow users to edit a map?

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
    this.code = [];
  }
}
class Square {
  constructor() {
    this.type = 'O';
    this.suit = null;
    this.users = [];
  }
}

class buildMapView extends React.Component {
    constructor(props) {
        super(props);
        //Needs to store users and 
        this.state = {grid: new Container(), curr:'O', currentUser: new CurrentUser(), disabledButtons:[false,false,false,false,false,false], submitCode: ''};
        this.setPoint = this.setPoint.bind(this);
        this.changeToDefault = this.changeToDefault.bind(this);        
        this.changeToWall = this.changeToWall.bind(this);        
        this.changeToDoor = this.changeToDoor.bind(this);        
        this.changeToTable = this.changeToTable.bind(this);        
        this.changeToElevator = this.changeToElevator.bind(this); 
        this.changeToStairs = this.changeToStairs.bind(this);        
        this.submitMap = this.submitMap.bind(this);        
        this.resetGrid = this.resetGrid.bind(this);
        this.resetGrid2 = this.resetGrid2.bind(this);
        this.resetGrid3 = this.resetGrid3.bind(this);
        this.resetGrid4 = this.resetGrid4.bind(this);



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
      //Function needs to be in ViewMap Segment
      //Search array at index and mark instances of it found in NxN grid 
      /*
      displayFriendsOnSide(event){
        var index = event.target.getAttribute("key");
        var name = this.currentUser.friends[index];
        for(let i = 0; i < this.state.grid.length();i++){
          for(let j = 0; j < this.state.grid.length();j++){
              if( name in this.state.grid[i][j].users  ){

              }
          } 
        }

      }
      */
      resetGrid(event){
        this.state.grid = new Container();
  
        for (let i = 0; i < 10; i++) {
          let container = new Container();
          this.state.grid.array.push(container);
          for (let j = 0; j < 10; j++){
            var square = new Square();
            this.state.grid.array[i].array.push(square);
          }
        }
        this.setState(this.state.grid);


      }
      resetGrid2(event){
        this.state.grid = new Container();
  
        for (let i = 0; i < 15; i++) {
          let container = new Container();
          this.state.grid.array.push(container);
          for (let j = 0; j < 15; j++){
            var square = new Square();
            this.state.grid.array[i].array.push(square);
          }
        }
        this.setState(this.state.grid);


      }
      resetGrid3(event){
        this.state.grid = new Container();
  
        for (let i = 0; i < 18; i++) {
          let container = new Container();
          this.state.grid.array.push(container);
          for (let j = 0; j < 18; j++){
            var square = new Square();
            this.state.grid.array[i].array.push(square);
          }
        }
        this.setState(this.state.grid);


      }
      resetGrid4(event){
        var val = event.target.value;

        this.state.grid = new Container();
  
        for (let i = 0; i < val; i++) {
          let container = new Container();
          this.state.grid.array.push(container);
          for (let j = 0; j < val; j++){
            var square = new Square();
            this.state.grid.array[i].array.push(square);
          }
        }
        this.setState(this.state.grid);


      }
      updateCode = (event) => {
        var newCode = event.target.value;
        this.setState({submitCode: newCode});
      }
      //Code here to send current grid layout to firebase under user credentials
      submitMap(event) {
        //Gets Current User and updates data to contain a new map code
        /*
        var temp = firebase.auth().currentUser;
        const userID = firebase.firestore().collection('users').doc(temp.uid);
        let arrUnion = userID.update({
          createdMaps: admin.firestore.FieldValue.arrayUnion(this.state.submitCode)
        });
        */
        //Begings opening db to submit map
        if(this.state.submitCode == ""){
          alert("Please enter a code");
          return;
        }
        var newMap = this.state.submitCode;
        let setDoc = firebase.firestore().collection('data').doc(newMap).set(JSON.parse( JSON.stringify(this.state.grid)));
        
        var user = firebase.auth().currentUser;
        //Data to grab username from firebase
        const userID = firebase.firestore().collection('users').doc(user.uid);
        let getDoc = userID.get()
          .then(doc => {
          if (!doc.exists) {
              alert("Error: Doesn't Exist");
              console.log('No such document!');
          } 
          else {
              //userMaps = doc.data().createdMaps
              this.setState({
                  userData: doc.data(),
                });
              this.state.userData.createdMaps.push(newMap);

              let setDoc = firebase.firestore().collection('users').doc(user.uid).update(this.state.userData);
          }
          })
          .catch(err => {
          console.log('Error getting document', err);
          });


          //Add map custom key into user object's list of maps
          //Update user db entry


        
      }
      //updates point based on the location the user clicks on the grid
      setPoint(event) {
        var col = event.target.getAttribute("id");
        var row = event.target.getAttribute("class");
        this.state.grid.array[row].array[col].type = this.state.curr;
        this.setState(this.state.grid);
      }
      //Buttons to switch user selection
      
      changeToDefault(event) {

        this.setState({
          curr: "O",
          disabledButtons: [true,false,false,false,false,false]
        });

      }
      changeToWall(event) {

        this.setState({
          curr: "w",
          disabledButtons: [false,true,false,false,false,false]
        });
      }
      changeToDoor(event){
        this.setState({
          curr: "d",
          disabledButtons: [false,false,true,false,false,false]
        });
      }
      changeToTable(event) {

        this.setState({
          curr: "t",
          disabledButtons: [false,false,false,true,false,false]
        });
      }
      changeToElevator(event){
        this.setState({
          curr: "e",
          disabledButtons: [false,false,false,false,true,false]
        });
      }
      changeToStairs(event){
        this.setState({
          curr: "s",
          disabledButtons: [false,false,false,false,false,true]
        });
      }
      
      render() {  


        return (
          <div>
              <h1>Create Map</h1>
                <label>
                  Select Areas to fill with Walls and Tables (Enter Grid Size to Change):
                </label>

                <br>
                </br>
                <br>
                </br>
                <Input placeholder="Enter Password Code" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />

                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >

                  <Grid item>  
                                  

                    {/*
                    <Button variant="contained" color="primary" onClick={this.resetGrid}>
                        10x10
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.resetGrid2}>
                        15x15
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.resetGrid3}>
                        18x18
                    </Button>
                    */}
                    <InputLabel id="label">Grid Size</InputLabel>
                    <Select onChange={this.resetGrid4} labelId="label" id="select" value="10">
                      <MenuItem value="10">10x10</MenuItem>
                      <MenuItem value="15">15x15</MenuItem>
                      <MenuItem value="18">18x18</MenuItem>
                    </Select>


                    <Grid item xs={12}
                     direction="row"   
                    >
                        <Button variant="contained" color="primary" onClick={this.changeToDefault} disabled={this.state.disabledButtons[0]}>
                            Undo
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.changeToWall} disabled={this.state.disabledButtons[1]}>
                            Wall
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.changeToDoor} disabled={this.state.disabledButtons[2]}>
                            Door
                        </Button>
                        <Button variant="contained" color="primary"  onClick={this.changeToTable} disabled={this.state.disabledButtons[3]}>
                            Table
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.changeToElevator} disabled={this.state.disabledButtons[4]}>
                            Elevator
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.changeToStairs} disabled={this.state.disabledButtons[5]}>
                            Stairs
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.submitMap}>
                        Submit
                    </Button>
                    </Grid>


                    <table class="flex-row">
                      <div class="flex-row"> 
                          {
                            this.state.grid.array.map((row, index) => (
                              <div key={index} id="row">
                                {row.array.map( (cellContent,colIndex) => 
                                  <div key={colIndex} onClick={this.setPoint} id={colIndex} className={index} img={cellContent.type} ></div>)}
                              </div>
                            ))
                          }
                      </div>
                    </table>
                 </Grid>
                 <Grid>
                  {/*
                    <Grid>
                        <br>
                        </br>
                        <h2>Your Friends:</h2>
                        <table>
                        {
                            this.state.currentUser.friends.map((friend, index) => (
                            <tr justify="center" key={index} id="row">
                                {friend}
                            </tr>
                            ))
                        }
                        </table>
                    </Grid>
                      */}
                  </Grid>
                  

                </Grid>


              {/*}
                <ol>
                  {this.state.grid.map(obj => <li>{obj}</li>)}
                </ol>
            */}

            
          </div>   
          );
        }
        
      }
      
export default buildMapView;
