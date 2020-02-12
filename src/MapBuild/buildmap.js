import React from 'react';

class buildMapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {grid: [], curr:'X'};
        this.setPoint = this.setPoint.bind(this);        
        this.handleChange = this.handleChange.bind(this);
        this.uploadMap = this.uploadMap.bind(this);
        
        const initializeGrid = () => {
          for (let i = 0; i < 5; i++) {
            this.state.grid.push([]);
            for (let j = 0; j < 5; j++){
              this.state.grid[i].push('O');
            }
          }
        };

        initializeGrid();
        console.log(this.state.grid);
      }
      setPoint(event) {
        //Col
        var col = event.target.getAttribute("id");
        console.log(col);
        //Row
        var row = event.target.getAttribute("class");
        console.log(row);
        //console.log(this.state.grid[row][col])
        
        this.state.grid[row][col] = this.state.curr;
        this.setState(this.state.grid);
        
        //console.log(this.state.grid[row][col])
        //console.log(this.state.grid);
        //this.forceUpdate();

        //this.setState({value: event.target.value});
      }
      handleChange(event) {
        //console.log(event.target.getAttribute("id"));
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
                <input type="button" name="name" />
                <input type="button" name="name" />
                <input type="button" name="name" />

              </form>
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
