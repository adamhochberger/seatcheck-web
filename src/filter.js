import React from 'react';

export default class MyFilteringComponent extends React.Component {
    state = {
        initialItems: [],
        items: []
    }
    constructor(props) {
      super(props);
      this.showFriendLocation = this.showFriendLocation.bind(this);     
  }
    //showFriendLocation = this.showFriendLocation.bind(this);     

    filterList = (event) => {
      let items = this.state.initialItems;
      items = items.filter((item) => {
        return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: items});
    }

    componentWillMount = () => {
      this.setState({          
          initialItems: this.props.content,
          items: this.props.content
      })
    }
    
    showFriendLocation(event){
      console.log(this.props.grid);
      var name = event.target.getAttribute("class");
      console.log(name);
      console.log(this.props.grid[0][0].users.includes(name));
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++){
          
          if(this.props.grid[i][j].users.includes(name)){
            this.props.grid[i][j].type = "X";
          }
          
        }
      }
      console.log(this.props.grid);
      this.setState({grid: this.props.grid});


    }

    render() {
      var self = this
      return (
        <div>
          <form>
                <input type="text" placeholder="Search" onChange={this.filterList}/>
          </form>
          <div>
            {
                this.state.items.map(function(item) {
                    return <div key={item} class={item} onClick={self.showFriendLocation}>{item}</div>
                })
            }
            </div>
        </div>
      );
    }
};