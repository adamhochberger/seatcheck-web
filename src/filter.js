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
      var name = event.target.getAttribute("key");

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++){
          if(this.props.grid[i][j].peopleSeated.includes(name)){
            this.props.grid[i][j].type = "X";
          }
        }
      }
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
                    return <div key={item} onClick={self.showFriendLocation}>{item}</div>
                })
            }
            </div>
        </div>
      );
    }
};