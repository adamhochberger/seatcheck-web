import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export default class MyFilteringComponent extends React.Component {
    state = {
        initialItems: [],
        items: []
    }
    constructor(props) {
      super(props);
      this.showFriendLocation = this.showFriendLocation.bind(this);     
  }
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

    demoMethod(i,j){
      this.props.sendGridData(i,j,"X");
    }

    showFriendLocation(event){
      if(this.props.grid == null){
        return
      }

      var name = event.target.getAttribute("class");
      
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++){
          
          if(this.props.grid[i][j].users.includes(name)){
              this.demoMethod(i,j);
          }
          
        }
      }
    }

    render() {
      var self = this
      return (
        <div>
          <form>
                <Input placeholder="Search" onChange={this.filterList} inputProps={{ 'aria-label': 'description' }} />
          </form>
          <div>
            {
                this.state.items.map(function(item) {
                    return <div key={item} class={item} onClick={self.showFriendLocation}>
                      {item}

                      {self.props.hasFriends ? (
                                            <Button variant="contained" color="primary">
                                            Add To Friends
                                          </Button>
                      ) : ''}

                    
                    </div>
                })
            }
            </div>
        </div>
      );
    }
};