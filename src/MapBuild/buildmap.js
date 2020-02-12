import React from 'react';

class buildMapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {grid: [], curr:'X'};
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
              this.state.grid[i].push('O');
            }
          }
        };
        initializeGrid();

      }
      setPoint(event) {
        var col = event.target.getAttribute("id");
        var row = event.target.getAttribute("class");
        this.state.grid[row][col] = this.state.curr;
        this.setState(this.state.grid);
      }
      changeToWall(event) {
        this.state.curr = "w";
        //this.setState(this.state.curr);
        //console.log(event.target.getAttribute("id"));
        //this.setState({grid[event.target.row][event.target.cellId]: event.target.value});
      }
      changeToDoor(event){
        this.state.curr = "d";
        //this.setState(this.state.curr);
      }
      changeToTable(event) {
        this.state.curr = "t";
        //this.setState(this.state.curr);
        //console.log(event.target.getAttribute("id"));
        //this.setState({grid[event.target.row][event.target.cellId]: event.target.value});
      }
      changeToElevator(event){
        this.state.curr = "e";
        //this.setState(this.state.curr);
      }
      //Code here to send current grid layout to firebase under user credentials
      submitMap(event) {
        this.state.curr = "w";
        //this.setState(this.state.curr);
        //console.log(event.target.getAttribute("id"));
        //this.setState({grid[event.target.row][event.target.cellId]: event.target.value});
      }
      changeToStairs(event){
        this.state.curr = "s";
        //this.setState(this.state.curr);
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
                      <td key={colIndex} onClick={this.setPoint} id={colIndex} class={index} >{cellContent}</td>)}
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
