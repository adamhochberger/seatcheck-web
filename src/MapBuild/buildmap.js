import React from 'react';

class buildMapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {grid:new Array(40).fill(["X"])};
        
        this.handleChange = this.handleChange.bind(this);
        this.uploadMap = this.uploadMap.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
      
      uploadMap(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
      
      render() {  

        return (
          <div>
          {console.log(this.state.grid)}
            {console.log("hello")}
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
            <tr key={row[0]}>
              {this.state.grid.map(cellId => <th key={cellId}>{cellId}</th>)}
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
