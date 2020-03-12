import React from 'react';
import MyFilteringComponent from '../filter.js';
import { Grid } from '@material-ui/core';

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
        this.state = {grid: [], curr:'O', currentUser: new CurrentUser(), peopleSeated: ['John',"Mark"]};
        this.displayFriendsOnSelect = this.displayFriendsOnSelect.bind(this);     
        this.submitMap = this.submitMap.bind(this);        
        this.getGridData = this.getGridData.bind(this);        

        
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
      //Sends data from parent to child
      getGridData(i,j,val){
        this.state.grid[parseInt(i)][parseInt(j)].type = val;
        this.setState(this.state.grid);

      }
      render() {  
        return (
          <div>
                <h1>View Map</h1>
                <label>
                  Example Viewing Map:
                </label>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center">
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
                      <Grid item>
                        <table>
                          {
                            this.state.grid.map((row, index) => (
                              <tr key={index} id="row">
                                {row.map( (cellContent,colIndex) => 
                                  <td key={colIndex} onClick={this.displayFriendsOnSelect} id={colIndex} className={index} img={cellContent.type} ></td>)}
                              </tr>
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
