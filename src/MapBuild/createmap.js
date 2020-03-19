import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

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
        this.state = {grid: [], curr:'O', currentUser: new CurrentUser(), disabledButtons:[false,false,false,false,false,false]};
        this.setPoint = this.setPoint.bind(this);
        this.changeToDefault = this.changeToDefault.bind(this);        
        this.changeToWall = this.changeToWall.bind(this);        
        this.changeToDoor = this.changeToDoor.bind(this);        
        this.changeToTable = this.changeToTable.bind(this);        
        this.changeToElevator = this.changeToElevator.bind(this); 
        this.changeToStairs = this.changeToStairs.bind(this);        
        this.submitMap = this.submitMap.bind(this);        

        
        const initializeGrid = () => {
          for (let i = 0; i < 10; i++) {
            this.state.grid.push([]);
            for (let j = 0; j < 10; j++){
              var square = new Square();
              this.state.grid[i].push(square);
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

      //Code here to send current grid layout to firebase under user credentials
      submitMap(event) {
        this.state.curr = "w";
      }
      //updates point based on the location the user clicks on the grid
      setPoint(event) {
        var col = event.target.getAttribute("id");
        var row = event.target.getAttribute("class");
        this.state.grid[row][col].type = this.state.curr;
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
                  Select Areas to fill with Walls and Tables (Choose an option):
                </label>
                <br>
                </br>
                <br>
                </br>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center">
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={1}
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
                    </Grid>
                  </Grid>

                  <Grid item>  
                                    
                    <label onClick={this.submitMap}>
                      Submit
                    </label>
                    <table>
                      {
                        this.state.grid.map((row, index) => (
                          <tr key={index} id="row">
                            {row.map( (cellContent,colIndex) => 
                              <td key={colIndex} onClick={this.setPoint} id={colIndex} className={index} img={cellContent.type} ></td>)}
                          </tr>
                        ))
                      }
                    </table>
                  </Grid>

                  <Grid item sm>
                    
                  </Grid>
                </Grid>


              {/*}
                <ol>
                  {this.state.grid.map(obj => <li>{obj}</li>)}
                </ol>
            */}

                    <br>
                    </br>
              <h2>Your Friends:</h2>
            <table>
              {
                this.state.currentUser.friends.map((friend, index) => (
                  <tr key={index} id="row">
                    {friend}
                  </tr>
                ))
              }
            </table>
          </div>   
          );
        }
        
      }
      
export default buildMapView;
