import React from 'react';

class buildMapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {grid:new Array(40).fill("X")};
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
          <form onSubmit={this.uploadMap}>
            <label>
              Submit my map:
            </label>
          </form>
            <ol>
              {this.state.grid.map(obj => <li>{obj}</li>)}
            </ol>
          </div>   
          );
        }
        
      }
      function buildMap_(props){
        //grid = [];

      }
      
export default buildMapView;
