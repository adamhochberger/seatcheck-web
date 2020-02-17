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
    this.users = ['Barry Allen', "Clark Kent"];
  }
}

class ViewMap extends React.Component {
    constructor(props) {
        super(props);
        //Needs to store users and 
        this.state = {grid: [], curr:'X', currentUser: new CurrentUser(), peopleSeated: ['John',"Mark"]};
        this.displayFriendsOnSelect = this.displayFriendsOnSelect.bind(this);     
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
        //this.state.curr = "w";
        this.setState({
            grid: this.state.grid, 
            curr: "w", 
            currentUser: this.state.currentUser,
            peopleSeated: this.state.peopleSeated
          })
      }
      //updates point based on the location the user clicks on the grid
      displayFriendsOnSelect(event) {
        var col = event.target.getAttribute("id");
        var row = event.target.getAttribute("class");

        this.setState({
            grid: this.state.grid, 
            curr: this.state.curr, 
            currentUser: new CurrentUser(), 
            peopleSeated: this.state.grid[row][col].users
          });


        this.state.peopleSeated = this.state.grid[row][col].users;
        this.setState(this.state.peopleSeated);
      }
      
      render() {  

        return (
          <div>
                <label>
                  Example Viewing Map:
                </label>
            <table>
              {
                this.state.grid.map((row, index) => (
                  <tr key={index} id="row">
                    {row.map( (cellContent,colIndex) => 
                      <td key={colIndex} onClick={this.displayFriendsOnSelect} id={colIndex} className={index} img={cellContent.type} >{cellContent.type}</td>)}
                  </tr>
                ))
              }
            </table>
                    <br>
                    </br>
              <h2>People Sitting Here:</h2>
            <table>
              {
                  
                this.state.peopleSeated.map((person, index) => (
                  <tbody key={index} id="row">
                    {person}
                  </tbody>
                ))
              }
            </table>
            <h2>Main Menu:</h2>

          </div>   
          );
        }
        
      }
      
export default ViewMap;
