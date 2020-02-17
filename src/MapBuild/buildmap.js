import React from 'react';


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
        this.state = {grid: [], curr:'X', currentUser: new CurrentUser()};
        this.setPoint = this.setPoint.bind(this);
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
          console.log(this.state.grid);
        };
        initializeGrid();

      }
      //Code here to send current grid layout to firebase under user credentials
      submitMap(event) {
        this.state.curr = "w";
      }
      setPoint(event) {
        var col = event.target.getAttribute("id");
        var row = event.target.getAttribute("class");
        this.state.grid[row][col].type = this.state.curr;
        this.setState(this.state.grid);
      }
      //Buttons to switch user selection
      changeToWall(event) {
        this.state.curr = "w";
      }
      changeToDoor(event){
        this.state.curr = "d";
      }
      changeToTable(event) {
        this.state.curr = "t";
      }
      changeToElevator(event){
        this.state.curr = "e";
      }
      changeToStairs(event){
        this.state.curr = "s";
      }
      
      render() {  

        return (
          <div>
                <label>
                  Select Areas to encode (Choose an option):
                </label>
                <br>
                </br>
                <br>
                </br>
                <label onClick={this.changeToWall}>
                  Wall:
                </label>
                
                <label onClick={this.changeToDoor}>
                  Door:
                </label>

                <label onClick={this.changeToTable}>
                  Table:
                </label>
                
                <label onClick={this.changeToElevator}>
                  Elevator:
                </label>

                <label onClick={this.changeToStairs}>
                  Stairs:
                </label>
                
                <label onClick={this.submitMap}>
                  Submit
                </label>

              {/*}
                <ol>
                  {this.state.grid.map(obj => <li>{obj}</li>)}
                </ol>
            */}

            <table>
              {
                this.state.grid.map((row, index) => (
                  <tr key={index} id="row">
                    {row.map( (cellContent,colIndex) => 
                      <td key={colIndex} onClick={this.setPoint} id={colIndex} className={index} img={cellContent.type} >{cellContent.type}</td>)}
                  </tr>
                ))
              }
            </table>
                    <br>
                    </br>

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
      function buildMap_(props){
        //grid = [];
        // Loop to create 2D array using 1D array 
      }
      
export default buildMapView;
