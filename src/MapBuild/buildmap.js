import React from 'react';

class buildMapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {grid:new Array(10).fill(["O"]), curr:'d'};
        this.setPoint = this.setPoint.bind(this);        
        this.handleChange = this.handleChange.bind(this);
        this.uploadMap = this.uploadMap.bind(this);
      }
      setPoint(event) {
        console.log(event.target.getAttribute("id"));
        //this.setState({value: event.target.value});
      }
      handleChange(event) {
        console.log(event.target.getAttribute("id"));
        //this.setState({grid[event.target.row][event.target.cellId]: event.target.value});
      }
      
      uploadMap(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
      
      render() {  

        return (
          <div>
              <form onSubmit={this.uploadMap}>
                <label>
                  Select Areas to encode:
                </label>
              </form>
              {/*}
                <ol>
                  {this.state.grid.map(obj => <li>{obj}</li>)}
                </ol>
            */}

            <table>
              {
                this.state.grid.map((row, index) => (
                  <tr onClick={this.handleChange} key={index} id="row">
                    {this.state.grid.map( (cellId,indexx) => <th key="1" id={indexx} onClick={this.setPoint} >{cellId}</th>)}
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
